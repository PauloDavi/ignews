import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLogged = true;

  return isUserLogged ? (
    <button
      type="button"
      className={styles.singInButton}
    >
      <FaGithub color="#04d361"/>
      Paulo Davi
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
    >
      <FaGithub color="#eba517"/>
      Entre com o GitHub
    </button>
  )
}