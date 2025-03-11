import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <View style={styles.container}>
      {/* Tabs List */}
      <View style={styles.tabsList}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabTrigger,
              activeTab === tab.key && styles.activeTabTrigger,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs Content */}
      <View style={styles.tabsContent}>
        {tabs.map(
          (tab) =>
            tab.key === activeTab && (
              <View key={tab.key} style={styles.tabContent}>
                {tab.content}
              </View>
            )
        )}
      </View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabsList: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  activeTabTrigger: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabsContent: {
    flex: 1,
  },
  tabContent: {
    padding: 10,
  },
});
