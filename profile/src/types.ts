export interface UserProfile {
    id: number;
    display_name: string;
    game_username: string;
    bio: string;
    avatar: string;
    banner_id: string;
    profile_color: string;
    coins: number;
    gems: number;
    wins: number;
    likes_count: number;
    age_days: number;
}

export interface ProfileResponse {
    ok: boolean;
    user: UserProfile;
    stats: any[];
}

export interface UpdateProfilePayload {
    display_name?: string;
    bio?: string;
    avatar?: string;
    banner_id?: string;
}
