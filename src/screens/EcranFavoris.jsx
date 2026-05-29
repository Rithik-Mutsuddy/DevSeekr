import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import CarteJob from '../components/CarteJob';

const LOGO_VIOLET = require('../../assets/logo_violet.png');

const COLORS = {
  primary: '#7c3aed',
  appBg: '#f9fafb',
  white: '#ffffff',
  border: '#e5e7eb',
  textDark: '#1f2937',
  textGray: '#6b7280',
  textLight: '#9ca3af',
};

const FAVORITE_JOBS = [
  {
    id: 1,
    title: 'Junior React Developer',
    company: 'TechStartup Paris',
    location: 'Paris',
    salary: '28k - 32k €',
    skills: ['React', 'JavaScript', 'CSS'],
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

export default function EcranFavoris({ navigation }) {
  const [favorites, setFavorites] = useState(FAVORITE_JOBS.map((j) => j.id));

  const toggleFavorite = (jobId) => {
    setFavorites((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <Image source={LOGO_VIOLET} style={styles.headerLogo} resizeMode="contain" />
        <Text style={styles.headerTitle}>Mes Favoris</Text>
      </View>

      {/* Liste des jobs favoris */}
      <ScrollView
        style={styles.jobList}
        contentContainerStyle={styles.jobListContent}
        showsVerticalScrollIndicator={false}
      >
        {FAVORITE_JOBS.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Aucun favori pour l'instant</Text>
            <Text style={styles.emptySubText}>Ajoutez des offres à vos favoris pour les retrouver ici.</Text>
          </View>
        ) : (
          FAVORITE_JOBS.map((job) => (
            <CarteJob
              key={job.id}
              job={job}
              isFavorite={favorites.includes(job.id)}
              onPressFavorite={() => toggleFavorite(job.id)}
              onPressVoir={() => navigation?.navigate('EcranDetails', { job })}
            />
          ))
        )}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('EcranAccueilPrincipal')}
          activeOpacity={0.7}
        >
          <Feather name="home" size={22} color={COLORS.textLight} />
          <Text style={styles.navLabel}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Feather name="thumbs-up" size={22} color={COLORS.primary} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Favoris</Text>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  jobList: {
    flex: 1,
  },
  jobListContent: {
    padding: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textGray,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 32,
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
