import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/ui/Header';
import { ChevronRight, ChevronDown } from 'lucide-react-native';
import { getRules } from '@/data/rules';

export default function RulesScreen() {
  const { colors } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  
  const rules = getRules();
  
  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Rules Reference" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {rules.map((section) => (
          <View 
            key={section.id}
            style={[
              styles.section, 
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
          >
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {section.title}
              </Text>
              {expandedSection === section.id ? (
                <ChevronDown size={24} color={colors.textSecondary} />
              ) : (
                <ChevronRight size={24} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            
            {expandedSection === section.id && (
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.ruleItem}>
                    {item.title && (
                      <Text style={[styles.ruleTitle, { color: colors.primary }]}>
                        {item.title}
                      </Text>
                    )}
                    <Text style={[styles.ruleText, { color: colors.text }]}>
                      {item.text}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
  },
  ruleItem: {
    marginBottom: 16,
  },
  ruleTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  ruleText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
});