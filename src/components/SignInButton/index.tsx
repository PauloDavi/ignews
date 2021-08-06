import { signIn, signOut, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button
      type="button"
      onClick={() => signOut()}
      className={styles.singInButton}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn('github')}
      className={styles.singInButton}
    >
      <FaGithub color="#eba517" />
      Entre com o GitHub
    </button>
  );
}
