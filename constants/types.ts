interface Title {
    romaji: string;
    native: string;
    english: string | null;
  }
  
  interface DateInfo {
    year: number | null;
    month: number | null;
    day: number | null;
  }
  
  interface CoverImage {
    extraLarge: string;
    color: string | null;
  }
  
  interface Trailer {
    id: string;
    site: string;
    thumbnail: string;
  }
  
  interface ExternalLink {
    site: string;
    icon: string | null;
    color: string | null;
    url: string;
  }
  
  interface Ranking {
    rank: number;
    type: string;
    season: string | null;
    allTime: boolean;
  }
  
  interface Studio {
    id: number;
    name: string;
    siteUrl: string;
  }
  
  interface RelationNode {
    id: number;
    title: Title;
    siteUrl: string;
  }
  
  interface RelationEdge {
    relationType: string;
    node: RelationNode;
  }
  
  interface AiringScheduleNode {
    episode: number;
    airingAt: number;
  }
  
export interface MediaItem {
    id: number;
    idMal: number;
    title: Title;
    startDate: DateInfo;
    endDate: DateInfo | null;
    status: string;
    season: string;
    format: string;
    genres: string[];
    synonyms: string[];
    duration: number | null;
    popularity: number;
    episodes: number | null;
    source: string;
    countryOfOrigin: string;
    hashtag: string | null;
    averageScore: number | null;
    siteUrl: string;
    description: string;
    bannerImage: string | null;
    isAdult: boolean;
    coverImage: CoverImage;
    trailer: Trailer | null;
    externalLinks: ExternalLink[];
    rankings: Ranking[];
    studios: {
      nodes: Studio[];
    };
    relations: {
      edges: RelationEdge[];
    };
    airingSchedule: {
      nodes: AiringScheduleNode[];
    };
  }
  