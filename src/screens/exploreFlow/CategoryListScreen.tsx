import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRoute } from "@react-navigation/native";

const CategoryListScreen: React.FC = () => {

    const route = useRoute(); 
   const { category } = route.params || {};
console.log(category,"category")
    return (
        <SafeAreaView style={styles.safe}>
                <Text style={styles.header}>Categories</Text>
        </SafeAreaView>
    );
};
export default CategoryListScreen;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f7f9fc' },
    header: {
      fontSize: 20,
      fontWeight: '700',
      color: '#1a2533',
      textAlign: 'center',
      paddingVertical: 16,
    },
});