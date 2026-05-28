import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { StatusBar } from '../components/StatusBar';
import { register, loginWithGoogle } from '../api/auth';
import { authStorage } from '../utils/storage';

const logo = require('../imports/Logo_DevSeekr_No_BG1.png');

const LEGAL_CONTENT = {
  terms: {
    title: "Conditions d'utilisation",
    sections: [
      { heading: "1. Acceptation des conditions", body: "En utilisant DevSeekr, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application." },
      { heading: "2. Description du service", body: "DevSeekr est une plateforme de mise en relation entre développeurs et entreprises. Nous facilitons la recherche d'emploi et le recrutement dans le secteur tech." },
      { heading: "3. Compte utilisateur", body: "Vous êtes responsable de la confidentialité de vos identifiants. Toute activité effectuée depuis votre compte est sous votre responsabilité." },
      { heading: "4. Utilisation acceptable", body: "Vous vous engagez à ne pas utiliser DevSeekr à des fins illégales, à ne pas publier de contenu trompeur, et à respecter les autres utilisateurs." },
      { heading: "5. Propriété intellectuelle", body: "Tout le contenu de DevSeekr est protégé par le droit d'auteur. Vous ne pouvez pas reproduire ou distribuer ce contenu sans autorisation écrite." },
      { heading: "6. Modification des conditions", body: "Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service vaut acceptation." },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    sections: [
      { heading: "1. Données collectées", body: "Nous collectons les données que vous nous fournissez (nom, email, CV) ainsi que des données d'utilisation pour améliorer notre service." },
      { heading: "2. Utilisation des données", body: "Vos données sont utilisées pour personnaliser votre expérience et améliorer nos algorithmes de matching. Nous ne vendons jamais vos données." },
      { heading: "3. Partage des données", body: "Vos informations peuvent être partagées avec les entreprises uniquement avec votre consentement explicite lors de la candidature." },
      { heading: "4. Vos droits (RGPD)", body: "Conformément au RGPD, vous avez le droit d'accéder, rectifier, supprimer vos données. Contactez-nous à privacy@devseekr.com." },
      { heading: "5. Sécurité", body: "Nous utilisons le chiffrement SSL/TLS pour protéger vos données. En cas de violation, vous serez notifié dans les 72 heures." },
    ],
  },
};

export function EcranInscription() {
  const navigation = useNavigation();
  const [view, setView] = useState('inscription');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  function switchView(v) { setError(''); setView(v); }

  async function handleRegister() {
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('Veuillez remplir tous les champs'); return; }
    if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (!acceptedTerms) { setError("Veuillez accepter les conditions d'utilisation"); return; }
    setLoading(true);
    try {
      const { token } = await register({ name, email, password });
      await authStorage.setToken(token);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setGoogleLoading(true);
    try {
      const { token } = await loginWithGoogle();
      await authStorage.setToken(token);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Une erreur est survenue');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <StatusBar />

        {/* ── INSCRIPTION ── */}
        {view === 'inscription' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Image source={logo} style={styles.logoImage} resizeMode="contain" />
              </View>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez DevSeekr dès maintenant</Text>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

            <View style={styles.fields}>
              <View>
                <Text style={styles.label}>Nom complet</Text>
                <View style={styles.inputRow}><User size={18} color="#7c3aed" /><TextInput style={styles.input} placeholder="Alex Martin" placeholderTextColor="#9ca3af" value={name} onChangeText={setName} autoCapitalize="words" editable={!loading} /></View>
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}><Mail size={18} color="#7c3aed" /><TextInput style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} /></View>
              </View>
              <View>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputRow}><Lock size={18} color="#7c3aed" /><TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={password} onChangeText={setPassword} secureTextEntry editable={!loading} /></View>
              </View>
              <View>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.inputRow}><Lock size={18} color="#7c3aed" /><TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry editable={!loading} /></View>
              </View>

              {/* Checkbox */}
              <TouchableOpacity style={styles.termsRow} onPress={() => setAcceptedTerms(v => !v)} activeOpacity={0.7}>
                <View style={[styles.checkbox, acceptedTerms && styles.checkboxOn]}>
                  {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  J'accepte les{' '}
                  <Text style={styles.link} onPress={() => switchView('terms')}>conditions d'utilisation</Text>
                  {' '}et la{' '}
                  <Text style={styles.link} onPress={() => switchView('privacy')}>politique de confidentialité</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.primaryBtn, (loading || googleLoading) && styles.disabled]} onPress={handleRegister} disabled={loading || googleLoading} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>S'inscrire</Text>}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={[styles.googleBtn, (loading || googleLoading) && styles.disabled]} onPress={handleGoogle} disabled={loading || googleLoading} activeOpacity={0.85}>
              {googleLoading ? <ActivityIndicator color="#7c3aed" size="small" /> : <Text style={styles.googleIcon}>G</Text>}
              <Text style={styles.googleBtnText}>Continuer avec Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ── LEGAL ── */}
        {(view === 'terms' || view === 'privacy') && (
          <View style={{ flex: 1 }}>
            <View style={styles.legalHeader}>
              <TouchableOpacity onPress={() => switchView('inscription')} style={styles.legalBackBtn}>
                <ArrowLeft size={18} color="#1a1a2e" />
              </TouchableOpacity>
              <Text style={styles.legalTitle}>{LEGAL_CONTENT[view].title}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.legalContent} showsVerticalScrollIndicator={false}>
              {LEGAL_CONTENT[view].sections.map((s) => (
                <View key={s.heading} style={styles.legalSection}>
                  <Text style={styles.legalHeading}>{s.heading}</Text>
                  <Text style={styles.legalBody}>{s.body}</Text>
                </View>
              ))}
              <Text style={styles.legalDate}>Dernière mise à jour : janvier 2025</Text>
            </ScrollView>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  card: { width: 375, minHeight: 600, backgroundColor: '#fff', borderRadius: 24, elevation: 10, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logoBox: { padding: 16, borderRadius: 20, marginBottom: 16 },
  logoImage: { width: 56, height: 56 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  errorBox: { backgroundColor: 'rgba(212,24,61,0.08)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  errorText: { fontSize: 13, color: '#d4183d' },
  fields: { gap: 14, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: '500', color: '#1a1a2e', marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  input: { flex: 1, fontSize: 14, color: '#1a1a2e', padding: 0 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingTop: 4 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f9fafb', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  checkboxOn: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  checkmark: { color: '#fff', fontSize: 11, fontWeight: '700' },
  termsText: { flex: 1, fontSize: 12, color: '#6b7280', lineHeight: 18 },
  primaryBtn: { backgroundColor: '#7c3aed', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  disabled: { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText: { fontSize: 12, color: '#6b7280' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12, marginBottom: 20, backgroundColor: '#fff' },
  googleIcon: { fontSize: 15, fontWeight: '700', color: '#4285F4' },
  googleBtnText: { fontSize: 14, fontWeight: '500', color: '#1a1a2e' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 14, color: '#6b7280' },
  link: { fontSize: 12, fontWeight: '600', color: '#7c3aed' },
  legalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  legalBackBtn: { padding: 6, borderRadius: 8, backgroundColor: '#f9fafb' },
  legalTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a2e' },
  legalContent: { paddingHorizontal: 20, paddingVertical: 20, gap: 20 },
  legalSection: { gap: 6 },
  legalHeading: { fontSize: 13, fontWeight: '600', color: '#1a1a2e' },
  legalBody: { fontSize: 13, color: '#6b7280', lineHeight: 20 },
  legalDate: { fontSize: 11, color: '#9ca3af', paddingTop: 8 },
});