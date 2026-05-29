import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#7c3aed',
  bg: '#ffffff',
  border: '#e5e7eb',
  tagBg: '#ede9fe',
  tagText: '#7c3aed',
  textDark: '#1f2937',
  textGray: '#6b7280',
  textLight: '#9ca3af',
  favEmpty: '#d1d5db',
};

export default function CarteJob({ job, isFavorite, onPressFavorite, onPressVoir }) {
  return (
    <View style={styles.card}>
      {/* Titre + bouton favori */}
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={2}>
          {job.title}
        </Text>
        <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteBtn} activeOpacity={0.7}>
          <Feather
            name="thumbs-up"
            size={16}
            color={isFavorite ? COLORS.primary : COLORS.favEmpty}
          />
        </TouchableOpacity>
      </View>

      {/* Entreprise */}
      <Text style={styles.company}>{job.company}</Text>

      {/* Localité + Salaire */}
      <View style={styles.infoRow}>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={11} color={COLORS.textLight} />
          <Text style={styles.locationText}>{job.location}</Text>
        </View>
        <Text style={styles.salary}>{job.salary}</Text>
      </View>

      {/* Skills + Bouton Voir */}
      <View style={styles.bottomRow}>
        <View style={styles.skills}>
          {job.skills.slice(0, 2).map((skill) => (
            <View key={skill} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 2 && (
            <Text style={styles.moreText}>+{job.skills.length - 2}</Text>
          )}
        </View>
        <TouchableOpacity onPress={onPressVoir} activeOpacity={0.8}>
          <LinearGradient
            colors={['#7c3aed', '#5b21b6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.voirBtn}
          >
            <Text style={styles.voirText}>Voir</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginRight: 8,
  },
  favoriteBtn: {
    padding: 2,
    flexShrink: 0,
  },
  company: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textGray,
    marginLeft: 3,
  },
  salary: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  tag: {
    backgroundColor: COLORS.tagBg,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 11,
    color: COLORS.tagText,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 11,
    color: COLORS.textLight,
    alignSelf: 'center',
  },
  voirBtn: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 8,
  },
  voirText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
