import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import CarteJob from '../components/CarteJob';

const LOGO_VIOLET = require('../../assets/logo_violet.png');

const COLORS = {
  primary: '#7c3aed',
  appBg: '#f9fafb',
  white: '#ffffff',
  border: '#e5e7eb',
  inputBg: '#f3f4f6',
  textDark: '#1f2937',
  textGray: '#6b7280',
  textLight: '#9ca3af',
  filterActiveBg: '#7c3aed',
  filterBg: '#f3f4f6',
};

const FILTERS = ['React', 'Node.js', 'Python', 'JavaScript', 'Remote'];

const JOBS = [
  {
    id: 1,
    title: 'Junior React Developer',
    company: 'TechStartup Paris',
    location: 'Paris',
    salary: '28k - 32k €',
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 2,
    title: 'Node.js Backend Junior',
    company: 'DataCorp',
    location: 'Lyon',
    salary: '30k - 35k €',
    skills: ['Node.js', 'MongoDB', 'API'],
  },
  {
    id: 3,
    title: 'Développeur Full Stack Junior',
    company: 'WebAgency',
    location: 'Remote',
    salary: '26k - 30k €',
    skills: ['React', 'Node.js', 'SQL'],
  },
];

export default function EcranAccueilPrincipal({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('React');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header : Logo + SearchBar */}
      <View style={styles.header}>
        <Image source={LOGO_VIOLET} style={styles.headerLogo} resizeMode="contain" />
        <View style={styles.searchBar}>
          <Feather name="search" size={17} color={COLORS.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un emploi..."
            placeholderTextColor={COLORS.textGray}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter chips horizontaux */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
            >
              {activeFilter === filter ? (
                <LinearGradient
                  colors={['#7c3aed', '#5b21b6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterChip}
                >
                  <Text style={[styles.filterText, styles.filterTextActive]}>{filter}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterChip}>
                  <Text style={styles.filterText}>{filter}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des jobs */}
      <ScrollView
        style={styles.jobList}
        contentContainerStyle={styles.jobListContent}
        showsVerticalScrollIndicator={false}
      >
        {JOBS.map((job) => (
          <CarteJob
            key={job.id}
            job={job}
            isFavorite={false}
            onPressFavorite={() => {}}
            onPressVoir={() => navigation?.navigate('EcranDetails', { job })}
          />
        ))}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Feather name="home" size={22} color={COLORS.primary} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('EcranFavoris')}
          activeOpacity={0.7}
        >
          <Feather name="thumbs-up" size={22} color={COLORS.textLight} />
          <Text style={styles.navLabel}>Favoris</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('EcranProfil')}
          activeOpacity={0.7}
        >
          <Feather name="user" size={22} color={COLORS.textLight} />
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.appBg,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  filterContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingTop: 2,
  },
  filterChip: {
    backgroundColor: COLORS.filterBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textGray,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  jobList: {
    flex: 1,
  },
  jobListContent: {
    padding: 16,
    paddingBottom: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
    color: COLORS.textLight,
    marginTop: 3,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
