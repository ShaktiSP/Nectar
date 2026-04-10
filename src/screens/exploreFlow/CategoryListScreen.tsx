import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";


const CategoryListScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { category } = (route.params as { category?: string }) || {};
    console.log(category, "category");
    
    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="chevron-back" size={24} color="#1a2533" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>{category || "Beverages"}</Text>

                {/* Filter Icon */}
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="options-outline" size={24} color="#1a2533" />
                </TouchableOpacity>
            </View>

            {/* Content area */}
            <View style={styles.content}>
                {/* Apna list/grid yahan render karo */}
            </View>
        </SafeAreaView>
    );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#f7f9fc",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },
    iconBtn: {
        padding: 4,
        width: 36,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a2533",
        textAlign: "center",
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
});