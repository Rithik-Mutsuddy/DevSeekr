import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const LOGO_BLANC = require('../../assets/logo_blanc.png');

const COLORS = {
  bg: '#080618',
  bgCard: '#110d2b',
  primary: '#7c3aed',
  primaryDim: 'rgba(124,58,237,0.18)',
  primaryBorder: 'rgba(124,58,237,0.35)',
  primaryBorderLight: 'rgba(124,58,237,0.2)',
  navBg: '#0d0b22',
  navBorder: 'rgba(124,58,237,0.2)',
  headerBorder: 'rgba(124,58,237,0.15)',
  textHeading: '#ede8ff',
  textSub: '#9284c0',
  textTag: '#c4b5fd',
  textTagActive: '#a78bfa',
  textMuted: '#4a3870',
  cardBorder: 'rgba(124,58,237,0.18)',
  white: '#ffffff',
};

const CONTRACT_TYPES = ['CDI', 'CDD', 'Stage', 'Alternance'];

export default function EcranProfil({ navigation }) {
  const [remoteEnabled, setRemoteEnabled] = useState(true);
  const [selectedContracts, setSelectedContracts] = useState(['CDI', 'Stage']);
  const [skills] = useState(['React', 'JavaScript', 'Node.js']);

  const toggleContract = (type) => {
    setSelectedContracts((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Status bar avec logo blanc */}
      <View style={styles.statusRow}>
        <Text style={styles.statusTime}>9:41</Text>
        <Image source={LOGO_BLANC} style={styles.statusLogo} resizeMode="contain" />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="settings" size={22} color={COLORS.textTagActive} />
        </TouchableOpacity>
      </View>

      {/* Contenu scrollable */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={46} color={COLORS.textTagActive} />
          </View>
          <Text style={styles.userName}>Alex Martin</Text>
          <Text style={styles.userRole}>Développeur Junior</Text>
        </View>

        {/* Compétences favorites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences favorites</Text>
          <View style={styles.tagsRow}>
            {skills.map((skill) => (
              <View key={skill} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          {/* Remote toggle */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Remote</Text>
            <Switch
              value={remoteEnabled}
              onValueChange={setRemoteEnabled}
              trackColor={{ false: COLORS.bgCard, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          {/* Type de contrat */}
          <View style={[styles.card, styles.cardColumn]}>
            <Text style={styles.cardLabel}>Type de contrat</Text>
            <View style={styles.contractRow}>
              {CONTRACT_TYPES.map((type) => {
                const active = selectedContracts.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => toggleContract(type)}
                    activeOpacity={0.7}
                    style={[
                      styles.contractChip,
                      active ? styles.contractChipActive : styles.contractChipInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.contractChipText,
                        active ? styles.contractChipTextActive : styles.contractChipTextInactive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Feather name="log-out" size={16} color={COLORS.primary} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('EcranAccueilPrincipal')}
          activeOpacity={0.7}
        >
          <Feather name="home" size={22} color={COLORS.textMuted} />
          <Text style={styles.navLabel}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('EcranFavoris')}
          activeOpacity={0.7}
        >
          <Feather name="thumbs-up" size={22} color={COLORS.textMuted} />
          <Text style={styles.navLabel}>Favoris</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Feather name="user" size={22} color={COLORS.primary} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.bg,
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textTag,
  },
  statusLogo: {
    width: 22,
    height: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.headerBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textHeading,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 24,
  },

  /* Avatar */
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryDim,
    borderWidth: 2,
    borderColor: COLORS.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textHeading,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.textSub,
  },

  /* Sections */
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textHeading,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.primaryDim,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textTag,
  },

  /* Cards */
  card: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textTag,
  },
  contractRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  contractChip: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  contractChipActive: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  contractChipInactive: {
    borderWidth: 1,
    borderColor: COLORS.primaryBorderLight,
  },
  contractChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  contractChipTextActive: {
    color: COLORS.textTagActive,
  },
  contractChipTextInactive: {
    color: '#6b5a9e',
  },

  /* Logout */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.primaryBorderLight,
    borderRadius: 14,
    backgroundColor: COLORS.bgCard,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },

  /* Bottom nav */
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.navBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.navBorder,
    paddingVertical: 10,
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 3,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
