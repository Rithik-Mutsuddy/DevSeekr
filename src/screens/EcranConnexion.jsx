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
import { Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { StatusBar } from '../components/StatusBar';
import { login, loginWithGoogle } from '../api/auth';
import { authStorage } from '../utils/storage';

const logo = require('../imports/Logo_DevSeekr_No_BG1.png');

export function EcranConnexion() {
  const navigation = useNavigation();
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  function switchView(v) {
    setError('');
    setForgotError('');
    setView(v);
  }

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const { token } = await login({ email, password });
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

  async function handleForgot() {
    setForgotError('');
    if (!forgotEmail) {
      setForgotError('Veuillez entrer votre adresse email');
      return;
    }
    setForgotLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setForgotLoading(false);
    setView('forgot-sent');
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <StatusBar />

        {/* ── LOGIN ── */}
        {view === 'login' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Image source={logo} style={styles.logoImage} resizeMode="contain" />
              </View>
              <Text style={styles.title}>Bienvenue</Text>
              <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

            <View style={styles.fields}>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                  <Mail size={18} color="#7c3aed" />
                  <TextInput style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputRow}>
                  <Lock size={18} color="#7c3aed" />
                  <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={password} onChangeText={setPassword} secureTextEntry editable={!loading} />
                </View>
              </View>
              <TouchableOpacity onPress={() => switchView('forgot')} style={styles.forgotBtn}>
                <Text style={styles.link}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.primaryBtn, (loading || googleLoading) && styles.disabled]} onPress={handleLogin} disabled={loading || googleLoading} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>Se connecter</Text>}
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
              <Text style={styles.footerText}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                <Text style={styles.link}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ── FORGOT ── */}
        {view === 'forgot' && (
          <View style={styles.content}>
            <TouchableOpacity onPress={() => switchView('login')} style={styles.backBtn}>
              <ArrowLeft size={18} color="#6b7280" />
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logoImageSm} resizeMode="contain" />
              <Text style={styles.title}>Mot de passe oublié</Text>
              <Text style={[styles.subtitle, { textAlign: 'center' }]}>Entrez votre email et nous vous enverrons un lien de réinitialisation</Text>
            </View>
            {!!forgotError && <View style={styles.errorBox}><Text style={styles.errorText}>{forgotError}</Text></View>}
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Mail size={18} color="#7c3aed" />
                <TextInput style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af" value={forgotEmail} onChangeText={setForgotEmail} keyboardType="email-address" autoCapitalize="none" editable={!forgotLoading} />
              </View>
            </View>
            <TouchableOpacity style={[styles.primaryBtn, forgotLoading && styles.disabled]} onPress={handleForgot} disabled={forgotLoading} activeOpacity={0.85}>
              {forgotLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>Envoyer le lien</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* ── FORGOT SENT ── */}
        {view === 'forgot-sent' && (
          <View style={[styles.content, styles.centered]}>
            <View style={styles.successCircle}>
              <CheckCircle size={32} color="#7c3aed" />
            </View>
            <Text style={[styles.title, { marginBottom: 8 }]}>Email envoyé !</Text>
            <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 32 }]}>
              Vérifiez votre boîte mail à <Text style={{ color: '#1a1a2e', fontWeight: '500' }}>{forgotEmail}</Text> et suivez les instructions.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => switchView('login')} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>Retour à la connexion</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  card: { width: 375, minHeight: 600, backgroundColor: '#fff', borderRadius: 24, elevation: 10, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  centered: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoBox: { padding: 16, borderRadius: 20, marginBottom: 16 },
  logoImage: { width: 56, height: 56 },
  logoImageSm: { width: 48, height: 48, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  errorBox: { backgroundColor: 'rgba(212,24,61,0.08)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  errorText: { fontSize: 13, color: '#d4183d' },
  fields: { gap: 16, marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '500', color: '#1a1a2e', marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  input: { flex: 1, fontSize: 14, color: '#1a1a2e', padding: 0 },
  forgotBtn: { alignSelf: 'flex-end' },
  primaryBtn: { backgroundColor: '#7c3aed', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  disabled: { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText: { fontSize: 12, color: '#6b7280' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12, marginBottom: 32, backgroundColor: '#fff' },
  googleIcon: { fontSize: 15, fontWeight: '700', color: '#4285F4' },
  googleBtnText: { fontSize: 14, fontWeight: '500', color: '#1a1a2e' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 14, color: '#6b7280' },
  link: { fontSize: 12, fontWeight: '600', color: '#7c3aed' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 32 },
  backText: { fontSize: 14, color: '#6b7280' },
  successCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(124,58,237,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
});