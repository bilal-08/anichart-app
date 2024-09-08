import { Text, View, Image, StyleSheet } from "react-native";

export default function Card({text,image,genres,title,studio,relation,relationType,status,startDate,episodes,airingSchedule,theme}:any) {
  // const text = "When Sakamoto meets Aoi, the convenience store clerk, it’s love at first sight — and just like that, he retires. Sakamoto gets married, has a daughter, opens a mom-and-pop store in a quiet town, and completely transforms … into a plus-size man. To ensure a peaceful life with his beloved family, the legendary ex–hit man bands together with comrades to face off against the looming threat of the Yakuza.";
  // console.log(theme)
  function getMonthByNumber(monthNumber: number): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  }
  function getTimeDifference(timestamp: number): string {
    // Convert timestamp to milliseconds
    // console.log(timestamp);
    if(timestamp == null || timestamp == undefined) return "";
    const targetTime = new Date(timestamp * 1000);
    const currentTime = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = targetTime.getTime() - currentTime.getTime();
  
    // Convert milliseconds to days and hours
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} days, ${hours} hours`;
}

  
  // const timestamp = 1726063200;
  // console.log(airingSchedule?.[0]?.airingAt,"aarin")
  // const s = getTimeDifference(airingSchedule[0].airingAt);
  // console.log(s);
  
  return (
    <View
      style={{
        height: 230,
        width: 360,
        backgroundColor: "#FAFCFC",
        flexDirection: "row",
        margin: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ position: 'relative', width: 150, height: 230 }}>
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: '100%', borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'flex-end',
            padding: 10,
            borderBottomLeftRadius: 5,
          }}
        >
          <Text style={{ ...styles.text, fontFamily: "overpass-bold", fontSize: 14, fontWeight: '600', color: '#fff' }}>
            {title}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: '600', color: theme.studioColor }} className="font-overpass-bold">
            {studio}
          </Text>
        </View>
      </View>
       
       <View style={{ flex: 1 }}>
        <View style={{ padding: 18, flex: 1 }}>
        <Text style={{ ...styles.text, fontSize: 14, fontWeight: 600, color: "#6E859E", fontFamily: "overpass-bold" }}>
         {status == "NOT_YET_RELEASED" ? "Airing in": status=="FINISHED"?`${episodes} Episodes aired on`:status=="RELEASING"?`Ep ${airingSchedule[0]?.episode} of ${episodes} airing in`:""}
        </Text>
        <Text style={{ ...styles.text, fontSize: 18, color: "#708499", fontFamily: "overpass-bold" }}>
         {status == "NOT_YET_RELEASED" ?`${getMonthByNumber(startDate.month)} ${startDate.year}`: status=="FINISHED"?`${getMonthByNumber(startDate.month)} ${startDate.day}, ${startDate.year}`:status=="RELEASING"?`${getTimeDifference(airingSchedule?.[0]?.airingAt)}`:""}
          {/* January 2025 */}
        </Text>
        <Text style={{ ...styles.text, fontSize: 13, color: "#92A1B1" }}>{relationType =="SOURCE" ? "Source • Manga" : `${relationType?.toLowerCase()} to ${relation}`}</Text>
        <Text style={{ ...styles.text, fontSize: 13, color: "#889BAF" }}>
          {text != null ? text.slice(0,122).trim():""}...
        </Text>
      </View>
      <View className="h-9 bg-[#EFF7FB] flex justify-center items-start pl-2">
        <View className="flex flex-row gap-2 items-start">
          { genres.length &&
            genres.slice(0,2).map((genre:string,i:number) => (
              <Text style={{color:theme.catergoryText, backgroundColor:theme.categoryBg}} className={`font-xs font-overpass-bold bg-[${theme.categoryBg}] rounded-2xl px-2 min-w-[56px] text-center`}>{genre.toLowerCase()}</Text>
            ))
          }
        {/* <Text className="font-sm font-overpass bg-[#EBB62D] text-[#963D13] rounded-2xl px-2 min-w-[56px] text-center">action</Text>
        <Text className="font-sm font-overpass bg-[#EBB62D] text-[#963D13] rounded-2xl px-2 min-w-[56px] text-center">comedy</Text> */}
      </View>
      </View>

        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "overpass",
  },
});
