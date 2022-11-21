import styles from '@/dashboard/css/dashboard.module.css'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

type Props = {
  user?: User
}
const Private: FC<Props> = () => {
  return <div className={styles.block}>Hey! This is a private page only for NFT holders!</div>
}

export default Private
