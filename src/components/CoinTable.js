import axios from "axios"
import { useState, useEffect } from "react"

const CoinTable = ({ name, symbol, price, volume }) => {
  const [crypto, setCrypto] = useState([])
  const [searchCrypto, setSearchCrypto] = useState("")

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCrypto(res.data)
      })
      .catch((error) => alert("yoo error"))
  }, [])

  return (
    <div className="container">
      <input
        type="text"
        placeholder="search coin ..."
        className="form-control"
        onChange={(e) => {
          setSearchCrypto(e.target.value)
        }}
      />
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>name</th>
            <th>symbol</th>
            <th>price</th>
            <th>market cap</th>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => {
              if (searchCrypto === "") {
                return val
              } else if (
                val.name.toLowerCase().includes(searchCrypto.toLowerCase()) ||
                val.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
              ) {
                return val
              }
            })
            .map((m) => (
              <tr key={m.name}>
                <td>{m.name}</td>
                <td>{m.symbol}</td>
                <td>{m.current_price}</td>
                <td>{m.market_cap}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinTable
