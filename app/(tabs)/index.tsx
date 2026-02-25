import { ScrollView, SafeAreaView } from "react-native";
import { useUserData } from "../../hooks/useUserData";
import HeroCard from "../../components/home/HeroCard";
import NextAppointment from "../../components/home/NextAppointment";
import QuickBookServices from "../../components/home/QuickBookServices";
import RecentReviews from "../../components/home/RecentReviews";
import LoyaltyProgress from "../../components/home/LoyaltyProgress";
import LocationCard from "../../components/home/LocationCard";

export default function HomeScreen() {
  const { userData } = useUserData();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <HeroCard />
        {userData?.phone && <NextAppointment phone={userData.phone} />}
        <QuickBookServices />
        <RecentReviews />
        {userData?.phone && <LoyaltyProgress phone={userData.phone} />}
        <LocationCard />
      </ScrollView>
    </SafeAreaView>
  );
}
