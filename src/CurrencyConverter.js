import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Move currencyNames outside the component
const currencyNames = {
    "ALL": "Albanian Lek",
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia and Herzegovina Convertible Mark",
    "BBD": "Barbadian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudian Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswana Pula",
    "BYN": "Belarusian Ruble",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLP": "Chilean Peso",
    "CNY": "Chinese Yuan",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fijian Dollar",
    "FKP": "Falkland Islands Pound",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Shekel",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgyzstani Som",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KPW": "North Korean Won",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Lao Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanmar Kyat",
    "MNT": "Mongolian Tögrög",
    "MOP": "Macanese Pataca",
    "MRU": "Mauritanian Ouguiya",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Złoty",
    "PYG": "Paraguayan Guaraní",
    "QAR": "Qatari Riyal",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLE": "Sierra Leonean Leone",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STN": "São Tomé and Príncipe Dobra",
    "SYP": "Syrian Pound",
    "SZL": "Eswatini Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistani Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Paʻanga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TVD": "Tuvaluan Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistani Som",
    "VES": "Venezuelan Bolívar",
    "VND": "Vietnamese Đồng",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tala",
    "XAF": "Central African CFA Franc",
    "XCD": "East Caribbean Dollar",
    "XOF": "West African CFA Franc",
    "XPF": "CFP Franc",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMW": "Zambian Kwacha",
    "ZWL": "Zimbabwean Dollar"
};


const currencySymbols = {
    "ALL": "L",
    "AED": "AED",
    "AFN": "AFN",
    "AMD": "֏",
    "ANG": "ƒ",
    "AOA": "Kz",
    "ARS": "$",
    "AUD": "$A",
    "AWG": "ƒ",
    "AZN": "₼",
    "BAM": "KM",
    "BBD": "Bds$",
    "BDT": "৳",
    "BGN": "лв",
    "BHD": "BD",
    "BIF": "FBu",
    "BMD": "BD$",
    "BND": "B$",
    "BOB": "Bs.",
    "BRL": "R$",
    "BSD": "B$",
    "BTN": "Nu.",
    "BWP": "P",
    "BYN": "Br",
    "BZD": "BZ$",
    "CAD": "C$",
    "CDF": "FC",
    "CHF": "CHF",
    "CLP": "$",
    "CNY": "¥",
    "COP": "$",
    "CRC": "₡",
    "CUP": "$",
    "CVE": "Esc",
    "CZK": "Kč",
    "DJF": "Fdj",
    "DKK": "kr",
    "DOP": "RD$",
    "DZD": "DA",
    "EGP": "E£",
    "ERN": "Nfk",
    "ETB": "Br",
    "EUR": "€",
    "FJD": "FJ$",
    "FKP": "£",
    "GBP": "£",
    "GEL": "₾",
    "GHS": "GH₵",
    "GIP": "£",
    "GMD": "D",
    "GNF": "FG",
    "GTQ": "Q",
    "GYD": "GY$",
    "HKD": "HK$",
    "HNL": "L",
    "HRK": "kn",
    "HTG": "G",
    "HUF": "Ft",
    "IDR": "Rp",
    "ILS": "₪",
    "INR": "₹",
    "IQD": "IQD",
    "IRR": "IRR",
    "ISK": "kr",
    "JMD": "J$",
    "JOD": "JD",
    "JPY": "¥",
    "KES": "KSh",
    "KGS": "лв",
    "KHR": "៛",
    "KMF": "CF",
    "KPW": "₩",
    "KRW": "₩",
    "KWD": "KD",
    "KYD": "CI$",
    "KZT": "₸",
    "LAK": "₭",
    "LBP": "LL",
    "LKR": "Rs",
    "LRD": "L$",
    "LSL": "M",
    "LYD": "LD",
    "MAD": "DH",
    "MDL": "L",
    "MGA": "Ar",
    "MKD": "ден",
    "MMK": "Ks",
    "MNT": "₮",
    "MOP": "MOP$",
    "MRU": "UM",
    "MUR": "₨",
    "MVR": "Rf",
    "MWK": "MK",
    "MXN": "$",
    "MYR": "RM",
    "MZN": "MT",
    "NAD": "N$",
    "NGN": "₦",
    "NIO": "C$",
    "NOK": "kr",
    "NPR": "Rs",
    "NZD": "NZ$",
    "OMR": "OMR",
    "PAB": "B/.",
    "PEN": "S/",
    "PGK": "K",
    "PHP": "₱",
    "PKR": "₨",
    "PLN": "zł",
    "PYG": "₲",
    "QAR": "ر.ق",
    "RON": "lei",
    "RSD": "дин.",
    "RUB": "₽",
    "RWF": "FRw",
    "SAR": "﷼",
    "SBD": "SI$",
    "SCR": "₨",
    "SDG": "ج.س.",
    "SEK": "kr",
    "SGD": "S$",
    "SHP": "£",
    "SLE": "Le",
    "SLL": "Le",
    "SOS": "Sh",
    "SRD": "$",
    "SSP": "£",
    "STN": "Db",
    "SYP": "£",
    "SZL": "E",
    "THB": "฿",
    "TJS": "SM",
    "TMT": "T",
    "TND": "د.ت",
    "TOP": "T$",
    "TRY": "₺",
    "TTD": "TT$",
    "TVD": "TVD$",
    "TWD": "NT$",
    "TZS": "TSh",
    "UAH": "₴",
    "UGX": "USh",
    "USD": "$",
    "UYU": "$U",
    "UZS": "лв",
    "VES": "Bs.",
    "VND": "₫",
    "VUV": "Vt",
    "WST": "WS$",
    "XAF": "FCFA",
    "XCD": "EC$",
    "XOF": "CFA",
    "XPF": "₣",
    "YER": "﷼",
    "ZAR": "R",
    "ZMW": "ZK",
    "ZWL": "Z$"
}



const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://open.er-api.com/v6/latest/USD')
            .then(response => {
                const fetchedCurrencies = Object.keys(response.data.rates);
                
                const currencyList = fetchedCurrencies.map(code => ({
                    code,
                    name: currencyNames[code] || "Unknown Currency"
                }));

                setCurrencies(currencyList);
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
                setError('Failed to load currency data.');
            });
    }, []);

    const convertCurrency = () => {
        setLoading(true);
        setError(null);

        axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
            .then(response => {
                const rate = response.data.rates[toCurrency];
                setConvertedAmount((amount * rate).toFixed(2));
            })
            .catch(error => {
                console.error('Error converting currency:', error);
                setError('Failed to convert currency.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
  {/* Navbar */}
  <nav className="navbar navbar-dark bg-primary mb-4">
    <div className="container">
      <span className="navbar-brand mb-0 h1">Currency Converter</span>
    </div>
  </nav>

  {/* Main Card */}
  <div className="container">
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3 text-center">Currency Converter</h2>
      {error && <p className="text-danger">{error}</p>}

      {/* Input & Select Fields */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="input-group">
            <input 
              type="number" 
              className="form-control " 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
            <span className="input-group-text fs-5">
              {currencySymbols[fromCurrency]}
            </span>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <select 
            className="form-select fs-5" 
            value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.length > 0 ? (
              currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        <div className="col-12 col-md-1 text-center align-self-center">
          <span className="fs-5">to</span>
        </div>

        <div className="col-12 col-md-3">
          <select 
            className="form-select fs-5" 
            value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.length > 0 ? (
              currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <div className="text-center mt-3">
        <button className="btn btn-primary w-100 w-md-auto" onClick={convertCurrency} disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>

      {/* Converted Amount */}
      {convertedAmount && (
        <h4 className="mt-3 text-center">
          Converted Amount: {convertedAmount} {toCurrency}
        </h4>
      )}
    </div>
  </div>

  {/* Footer */}
  <footer className="bg-light text-center p-3 mt-4">
    <p>&copy; {new Date().getFullYear()} Currency Converter. All rights reserved.</p>
  </footer>
</>

    );
};

export default CurrencyConverter;

