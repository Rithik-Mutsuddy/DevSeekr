
export async function mockLogin({ email, password }) {
  await new Promise((r) => setTimeout(r, 1000));

  if (!email || !password) {
    throw new Error('Email et mot de passe requis');
  }

  return { token: 'mock-token-' + Date.now() };
}

export async function mockRegister({ name, email, password }) {
  await new Promise((r) => setTimeout(r, 1000));

  if (!name || !email || !password) {
    throw new Error('Tous les champs sont requis');
  }

  return { token: 'mock-token-' + Date.now() };
}

export async function mockLoginWithGoogle() {
  await new Promise((r) => setTimeout(r, 1000));

  return { token: 'mock-google-token-' + Date.now() };
}
