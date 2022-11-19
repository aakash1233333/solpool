import { client } from '../../../lib/sanity'

const query = `*[_type=="trips"]`

const getTrips = async (req, res) => {
    try {
        const sanityResponse = await client.fetch(query)
        res.status(200).send({ message: 'success', data: sanityResponse })
      } catch (error) {
        res.status(500).send({ message: 'error', data: error.message })
      }
}

export default getTrips;