import { UserProfile, GameStats } from './types.js';

class Store {
    public currentUser: UserProfile | null = null;
    public currentStats: GameStats[] = [];
    public isLiked = false;

    setUser(user: UserProfile, stats: GameStats[]) {
        this.currentUser = user;
        this.currentStats = stats || [];
    }

    setLiked(liked: boolean) {
        this.isLiked = liked;
    }

    getUser() {
        return this.currentUser;
    }
}

export const store = new Store();
