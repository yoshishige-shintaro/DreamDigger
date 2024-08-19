import AchievedBucketItemsCard from "@/components/history/AchievdBucketItemsCard";
import BarChartCard from "@/components/history/BartChartCard";
import { drizzleDb } from "@/lib/db/db";
import { bucketItemsSchema } from "@/lib/db/schema";
import { StatusValue } from "@/lib/types/BucketItem";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { ScrollView } from "react-native";

export default function TabTwoScreen() {
  const { data: achievedBucketItems } = useLiveQuery(
    drizzleDb
      .select()
      .from(bucketItemsSchema)
      .where(eq(bucketItemsSchema.status, StatusValue.ACHIEVED))
      .orderBy(desc(bucketItemsSchema.achievedAt)),
  );

  return (
    <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
      <BarChartCard achievedBucketItems={achievedBucketItems} />
      <AchievedBucketItemsCard achievedBucketItems={achievedBucketItems} />
    </ScrollView>
  );
}
