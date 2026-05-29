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
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#7c3aed',
  primaryDark: '#5b21b6',
  white: '#ffffff',
  border: '#e5e7eb',
  tagBg: '#ede9fe',
  tagText: '#7c3aed',
  textDark: '#1f2937',
  textGray: '#6b7280',
  textLight: '#9ca3af',
  bannerOverlay: 'rgba(255,255,255,0.25)',
  bannerBorder: 'rgba(255,255,255,0.5)',
};

const DEFAULT_JOB = {
  id: 1,
  title: 'Junior React Developer',
  company: 'TechStartup Paris',
  location: 'Paris',
  salary: '28k - 32k €/an',
  contractType: 'CDI',
  skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Git'],
  description:
    "Nous recherchons un développeur React junior motivé pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants et aurez l'opportunité d'apprendre auprès de développeurs expérimentés. Une première expérience en React est appréciée.",
  about:
    "TechStartup Paris est une startup innovante spécialisée dans le développement d'applications web modernes. Notre équipe de 15 personnes travaille dans un environnement agile et bienveillant.",
};

export default function EcranDetails({ route, navigation }) {
  const job = route?.params?.job ?? DEFAULT_JOB;
  const initial = job.company?.[0]?.toUpperCase() ?? 'J';

  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header : bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Contenu scrollable */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Banner gradient mauve */}
        <LinearGradient
          colors={['#7c3aed', '#5b21b6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          {/* Cercles décoratifs */}
          <View style={styles.bannerCircle1} />
          <View style={styles.bannerCircle2} />

          {/* Initiale de l'entreprise */}
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>{initial}</Text>
          </View>
        </LinearGradient>

        {/* Informations principales */}
        <View style={styles.infoSection}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Feather name="map-pin" size={15} color={COLORS.textLight} />
              <Text style={styles.metaText}>{job.location}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Feather name="briefcase" size={15} color={COLORS.textLight} />
              <Text style={styles.metaText}>{job.contractType ?? 'CDI'}</Text>
            </View>
          </View>

          <Text style={styles.salary}>{job.salary}</Text>
        </View>

        {/* Section Compétences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences requises</Text>
          <View style={styles.skillsContainer}>
            {(job.skills ?? DEFAULT_JOB.skills).map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.bodyText}>
            {job.description ?? DEFAULT_JOB.description}
          </Text>
        </View>

        {/* Section À propos */}
        <View style={[styles.section, styles.sectionLast]}>
          <Text style={styles.sectionTitle}>À propos de l'entreprise</Text>
          <Text style={styles.bodyText}>
            {job.about ?? DEFAULT_JOB.about}
          </Text>
        </View>
      </ScrollView>

      {/* Boutons d'action bas de page */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.85}>
          <LinearGradient
            colors={['#7c3aed', '#5b21b6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnPostuler}
          >
            <Text style={styles.btnPostulerText}>Postuler</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite((prev) => !prev)}
          activeOpacity={0.85}
        >
          {isFavorite ? (
            <LinearGradient
              colors={['#7c3aed', '#5b21b6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnFavori}
            >
              <Feather name="thumbs-up" size={17} color={COLORS.white} />
              <Text style={[styles.btnFavoriText, styles.btnFavoriTextActive]}>
                Retiré des favoris
              </Text>
            </LinearGradient>
          ) : (
            <View style={styles.btnFavori}>
              <Feather name="thumbs-up" size={17} color={COLORS.primary} />
              <Text style={styles.btnFavoriText}>Ajouter aux favoris</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 2,
    alignSelf: 'flex-start',
  },
  scroll: {
    flex: 1,
  },

  /* Banner */
  banner: {
    height: 120,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerCircle1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -60,
    right: -40,
  },
  bannerCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -30,
    left: -20,
  },
  initialContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.bannerOverlay,
    borderWidth: 2,
    borderColor: COLORS.bannerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },

  /* Infos principales */
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  companyName: {
    fontSize: 15,
    color: COLORS.textGray,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textGray,
    marginLeft: 5,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textLight,
    marginHorizontal: 10,
  },
  salary: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },

  /* Sections */
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
  },
  sectionLast: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: COLORS.tagBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagText: {
    fontSize: 13,
    color: COLORS.tagText,
    fontWeight: '500',
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
  },

  /* Boutons d'action */
  actionsContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },
  btnPostuler: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPostulerText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  btnFavori: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 13,
  },
  btnFavoriText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
  btnFavoriTextActive: {
    color: COLORS.white,
  },
});
