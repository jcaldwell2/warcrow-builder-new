import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/ui/Header';
import { ExternalLink, Moon, Sun, Database, Trash2, FileJson } from 'lucide-react-native';
import { useSavedArmies } from '@/hooks/useSavedArmies';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { clearAllArmies } = useSavedArmies();
  
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will delete all saved armies. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete All", 
          onPress: () => {
            clearAllArmies();
            Alert.alert("Success", "All army data has been deleted");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Settings" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance
          </Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              {isDark ? (
                <Moon size={24} color={colors.textSecondary} />
              ) : (
                <Sun size={24} color={colors.textSecondary} />
              )}
              <Text style={[styles.settingText, { color: colors.text }]}>
                Dark Theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.backgroundSecondary, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Data Management
          </Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
          >
            <View style={styles.settingInfo}>
              <FileJson size={24} color={colors.textSecondary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Export Army Data
              </Text>
            </View>
            <ExternalLink size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
          >
            <View style={styles.settingInfo}>
              <Database size={24} color={colors.textSecondary} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Import Army Data
              </Text>
            </View>
            <ExternalLink size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleClearData}
          >
            <View style={styles.settingInfo}>
              <Trash2 size={24} color={colors.error} />
              <Text style={[styles.settingText, { color: colors.error }]}>
                Clear All Data
              </Text>
            </View>
            <ExternalLink size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingText, { color: colors.text }]}>
                Version
              </Text>
            </View>
            <Text style={[styles.versionText, { color: colors.textSecondary }]}>
              1.0.0
            </Text>
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingText, { color: colors.text }]}>
                Privacy Policy
              </Text>
            </View>
            <ExternalLink size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Warcrow Army Builder is not affiliated with Corvus Belli.
          Warcrow and all associated names and images are property of Corvus Belli.
        </Text>
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
  sectionTitle: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 18,
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    marginLeft: 16,
  },
  versionText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
  },
  footerText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  }
});