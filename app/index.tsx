import { Text, View, ScrollView, TextInput } from "react-native";
import Card from "@/components/Card";
import Menu from "@/components/Menu";
import { useState, useEffect } from "react";
import { type MediaItem } from "@/constants/types";
import SkeletonCard from "@/components/SkeletonCard";
import { StatusBar } from "expo-status-bar";
type MenuType =
  | "WINTER"
  | "SPRING"
  | "SUMMER"
  | "FALL"
  | "ARCHIVE"
  | "TBA"
  | "AIRING";

export default function Index() {
  const [selectedType, setSelectedType] = useState<MenuType>("WINTER");
  const [data, setData] = useState<any>({});
  const [filterData, setFilterData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const theme = [
    {
      studioColor: "#F09275",
      categoryBg: "#EBB62D",
      catergoryText: "#963D13",
    },
    {
      studioColor: "#F06371",
      categoryBg: "#E34F85",
      catergoryText: "#FFE0EC",
    },
    {
      studioColor: "#F0708F",
      categoryBg: "#EF5D5D",
      catergoryText: "#FCD4D7",
    },
    {
      studioColor: "#AEE973",
      categoryBg: "#278019",
      catergoryText: "#80B575",
    },
    {
      studioColor: "#3869E5",
      categoryBg: "#2F3689",
      catergoryText: "#C9D3F3",
    },
    {
      studioColor: "#444347",
      categoryBg: "#6EC8F2",
      catergoryText: "#1C4973",
    },
    {
      studioColor: "#D2CB75",
      categoryBg: "#E0D59E",
      catergoryText: "#4D616E",
    },
    {
      studioColor: "#66B7F0",
      categoryBg: "#BEE3F9",
      catergoryText: "#263977",
    },
    {
      studioColor: "#236C78",
      categoryBg: "#77F3E9",
      catergoryText: "#236C78",
    },
  ];
  function getYearForSeason(menuType: MenuType): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const seasonStartMonths: { [key in Partial<MenuType>]: number } = {
      WINTER: 11,
      SPRING: 2,
      SUMMER: 5,
      FALL: 8,
      AIRING: 0,
      ARCHIVE: 0,
      TBA: 0,
    };

    const seasonStartMonth = seasonStartMonths[menuType];

    if (month >= seasonStartMonth) {
      return currentYear;
    } else {
      return currentYear + 1;
    }
  }

  useEffect(() => {
    if (text === "") {
      setFilterData(data.data?.Page.media || []);
    } else {
      function searchAndSortByRomaji(
        mediaItems: MediaItem[],
        query: string
      ): MediaItem[] {
        const lowerCaseQuery = query.toLowerCase();
        return mediaItems.filter((item) =>
          item.title.romaji.toLowerCase().includes(lowerCaseQuery)
        );
      }
      setFilterData(searchAndSortByRomaji(data.data?.Page.media || [], text));
    }
  }, [text, data]);

  useEffect(() => {
    setLoading(true);
    fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query (
          $season: MediaSeason,
          $year: Int,
          $format: MediaFormat,
          $excludeFormat: MediaFormat,
          $status: MediaStatus,
          $minEpisodes: Int,
          $page: Int,
        ){
          Page(page: $page) {
            pageInfo {
              hasNextPage
              total
            }
            media(
              season: $season
              seasonYear: $year
              format: $format,
              format_not: $excludeFormat,
              status: $status,
              episodes_greater: $minEpisodes,
              isAdult: false,
              type: ANIME,
              sort: TITLE_ROMAJI,
            ) {
              id
              idMal
              title {
                romaji
                native
                english
              }
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              status
              season
              format
              genres
              synonyms
              duration
              popularity
              episodes
              source(version: 2)
              countryOfOrigin
              hashtag
              averageScore
              siteUrl
              description
              bannerImage
              isAdult
              coverImage {
                extraLarge
                color
              }
              trailer {
                id
                site
                thumbnail
              }
              externalLinks {
                site
                icon
                color
                url
              }
              rankings {
                rank
                type
                season
                allTime
              }
              studios(isMain: true) {
                nodes {
                  id
                  name
                  siteUrl
                }
              }
              relations {
                edges {
                  relationType(version: 2)
                  node {
                    id
                    title {
                      romaji
                      native
                      english
                    }
                    siteUrl
                  }
                }
              }
              airingSchedule(
                notYetAired: true
                perPage: 2
              ) {
                nodes {
                  episode
                  airingAt
                }
              }
            }
          }
        }`,
        variables: {
          season: selectedType,
          year: getYearForSeason(selectedType),
          format: "TV",
          page: 1,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) return;
        data.data.Page.media.sort(
          (a: MediaItem, b: MediaItem) => b.popularity - a.popularity
        );
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedType]);

  const animeData = filterData.length
    ? filterData
    : data.data?.Page.media || [];

  return (
    <>
      <View className="flex-1 relative items-center mt-6">
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="Filter Anime"
          placeholderTextColor={"#7C9FC7"}
          className="bg-white h-10 rounded-lg pl-2 border-none text-[#7C9FC7] font-overpass w-10/12 m-5"
        />
        <StatusBar
          style="auto"
          backgroundColor="#2B2D42"
          // hidden={true}
        />
        <ScrollView
          className="flex-1 bg-EDF1F5"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="font-overpass-bold text-[#5C728A] text-xl text-left w-full pl-5 pt-3">
            TV
          </Text>
          <View className="mb-32">
            {data.data &&
              !loading &&
              animeData.map((item: MediaItem, index: number) => {
                const selectedTheme = theme[index % theme.length];
                return (
                  <Card
                    text={item.description}
                    data={item}
                    title={item.title.romaji}
                    image={item.coverImage.extraLarge}
                    genres={item.genres}
                    status={item.status}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    episodes={item.episodes}
                    airingSchedule={item.airingSchedule.nodes}
                    studio={item.studios.nodes[0]?.name}
                    relation={item.relations.edges[0]?.node.title.romaji}
                    relationType={item.relations.edges[0]?.relationType}
                    key={item.id}
                    theme={selectedTheme}
                  />
                );
              })}
            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </View>
        </ScrollView>
        <Menu select={setSelectedType} />
      </View>
    </>
  );
}
