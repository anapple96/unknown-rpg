import {GameState} from "./GameState";
import {Feature} from "./Feature";
import {Wallet} from "@/engine/features/wallet/Wallet";
import {LocalStorage} from "@/engine/saving/LocalStorage";
import {Settings} from "@/engine/features/settings/Settings";
import {Statistics} from "@/engine/features/statistics/Statistics";
import {Achievements} from "@/engine/features/achievements/Achievements";
import {World} from "@/game/features/world/World";
import {Player} from "@/game/features/player/Player";
import {PlayerInventory} from "@/game/features/inventory/PlayerInventory";
import {ItemList} from "@/game/items/ItemList";
import {Skill} from "@/game/features/skill/Skill";

export class Game {
    private _tickInterval: any;

    public player: Player;
    public playerInventory: PlayerInventory;
    public wallet: Wallet;
    public world: World;
    public settings: Settings;
    public statistics: Statistics;
    public achievements: Achievements;

    public allFeatures: Feature[];

    public state: GameState;

    private readonly TICK_DURATION_MS = 100.0;

    constructor(player: Player, playerInventory: PlayerInventory, wallet: Wallet, world: World, settings: Settings, statistics: Statistics, achievements: Achievements, skill: Skill) {
        this.allFeatures = [];

        this.player = this.registerFeature(player);
        this.playerInventory = this.registerFeature(playerInventory);
        this.wallet = this.registerFeature(wallet)
        this.world = this.registerFeature(world);
        this.settings = this.registerFeature(settings);
        this.statistics = this.registerFeature(statistics);
        this.achievements = this.registerFeature(achievements);

        this.state = GameState.starting;
    }

    /**
     * Register a feature so it becomes part of all features
     */
    private registerFeature<T extends Feature>(feature: T): T {
        this.allFeatures.push(feature);
        return feature;
    }

    /**
     * Update all features
     */
    private update(): void {
        if (this.state != GameState.playing) {
            return;
        }

        for (const feature of this.getAllFeatures()) {
            feature.update(this.TICK_DURATION_MS / 1000.0)
        }
    }


    /**
     * Initialize all features
     */
    public initialize(): void {
        ItemList.initialize();

        for (const feature of this.getAllFeatures()) {
            feature.initialize();
        }

    }

    /**
     * Start the main update loop
     */
    public start(): void {
        if (this.state === GameState.playing) {
            console.error("Cannot start the game twice");
            return;
        }

        this._tickInterval = setInterval(() => this.update(), this.TICK_DURATION_MS);

        this.state = GameState.playing;
        console.log("Started");
    }

    /**
     * Stop the main update loop
     */
    public stop(): void {
        clearInterval(this._tickInterval);

        this.state = GameState.stopped;
        console.log("Stopped");
    }

    /**
     * Recursively save all registered features
     */
    public save(): void {
        const res: Record<string, unknown> = {};
        for (const feature of this.getAllFeatures()) {
            res[feature.saveKey] = feature.save()
        }
        LocalStorage.store('save', res)
    }

    /**
     * Delete the locally stored save
     */
    public deleteSave(): void {
        LocalStorage.delete('save');
    }

    /**
     * Recursively load all registered features
     */
    public load(): void {
        const saveData = LocalStorage.get('save')
        for (const feature of this.getAllFeatures()) {
            const featureSavedata: Record<string, unknown> = saveData == null ? {} : saveData[feature.saveKey] as Record<string, unknown> ?? {};
            feature.load(feature.parseSaveData(featureSavedata));
        }
    }

    public getTotalMoneyMultiplier(): number {
        let res = 1;
        for (const feature of this.getAllFeatures()) {
            res *= feature.getMoneyMultiplier();
        }
        return res;
    }

    /**
     * Return all registered features, see this.registerFeature()
     */
    public getAllFeatures(): Feature[] {
        return this.allFeatures;
    }
}
