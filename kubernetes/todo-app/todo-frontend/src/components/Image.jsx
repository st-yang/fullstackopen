import config from '../util/config'

const Image = () => {
  console.log(`image url: ${config.BACKEND_URL}/api/image`)
  return <img width={300} src={`${config.BACKEND_URL}/api/image`} />
}

export default Image
