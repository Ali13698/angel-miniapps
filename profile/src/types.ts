export interface UserProfile {
    id: number;
    display_name: string;
    game_username: string;
    bio: string;
    avatar: string;
    profile_color: string;
    profile_banner: string;
    name_effect: string;
    name_emoji: string;
    banner_id: string;
    frame_id: string;
    hat_id: string;
    chat_bubble_id: string;
    badge_id: string;
    coins: number;
    gems: number;
    wins: number;
    losses: number;
    level: number;
    xp: number;
    likes_count: number;
    streak_days: number;
    active_days: number;
    age_days: number;
}

export interface GameStats {
    game_id: string;
    wins: number;
    losses: number;
    draws: number;
    games_played: number;
    level: number;
    xp: number;
}

export interface ProfileResponse {
    ok: boolean;
    user: UserProfile;
    stats: GameStats[];
}

export interface UpdateProfilePayload {
    display_name?: string;
    game_username?: string;
    bio?: string;
    avatar?: string;
    name_emoji?: string;
    profile_color?: string;
    banner_id?: string;
    frame_id?: string;
    hat_id?: string;
    chat_bubble_id?: string;
    badge_id?: string;
}
