import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.top}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottom}>
          {/* ✅ Updated with navigation to SignInScreen */}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/SignInScreen')}>
            <Text style={styles.buttonText}>Sign in with Email</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={styles.link}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/screens/SignUpScreen')}>
              <Text style={styles.linkHighlight}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  top: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottom: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#00f',
    textDecorationLine: 'underline',
  },
});

