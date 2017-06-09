import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';
import Upload from 'meteor/xavcz:nova-forms-upload';
import CvUpload from 'meteor/cityhive:cv-upload';
import PublicationUtils from 'meteor/utilities:smart-publications';

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

// remove fields
Users.removeField('telescope.notifications_users');
Users.removeField('telescope.notifications_posts');
Users.removeField('telescope.bio');

const professionalGroup = {
  name: "professional",
  label: "Edit your professional details",
  order: 1
};

const qualificationsGroup = {
  name: "qualifications",
  label: "Edit your qualifications",
  order: 2
};

const extraDetailsGroup = {
  name: "extraDetails",
  label: "Edit your extra details",
  order: 3
};

// years range

let currentYear = new Date().getFullYear(),
  years = [],
  startYear = 1950;

years.push({
  label: '--- please choose ---',
  value: ''
});

while ( startYear <= currentYear ) {
  let year = startYear++;
  years.push({label: year, value: year});
}

// add new fields

Users.addField(
  [
    {// Field required by mizzao:user-status
      fieldName: 'status',
      fieldSchema: {
        type: Object,
        blackbox: true,
        publish: true,
        optional: true
      }
    },
    {
      fieldName: 'profile',
      fieldSchema: {
        type: Object,
        optional: true,
        blackbox: false
      }
    },
    {
      fieldName: 'profile.image',
      fieldSchema: {
        type: String,
        optional: true,
        publish: true,
        control: Upload,
        insertableIf: canInsert,
        editableIf: canEdit,
        autoform: {
          options: {
            preset: Telescope.settings.get('cloudinaryPresets').avatar
          }
        }
      }
    },
    {
      fieldName: 'profile.title',
      fieldSchema: {
        type: String,
        control: "select",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Miss',
              value: 'miss'
            },
            {
              label: 'Mrs',
              value: 'mrs'
            },
            {
              label: 'Ms',
              value: 'ms'
            },
            {
              label: 'Mr',
              value: 'mr'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.firstName',
      fieldSchema: {
        type: String,
        control: "text",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.lastName',
      fieldSchema: {
        type: String,
        control: "text",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.personalEmail',
      fieldSchema: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
        insertableIf: canInsert,
        editableIf: canEdit
      }
    },
    {
      fieldName: 'profile.mobileNumber',
      fieldSchema: {
        type: String,
        control: "text",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.basedIn',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        autoform: {
          options: countriesOptions()
        },
      }
    },
    {
      fieldName: 'profile.bio',
      fieldSchema: {
        type: String,
        control: "textarea",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.profession',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        optional: true,  //delete
        autoform: {
          options: [
            {
              "label": "--- please choose ---",
              "value": ""
            },
            {
              "value": "asset management",
              "label": "Asset Management",
              "id": "profession"
            },
            {
              "value": "capital markets",
              "label": "Capital Markets",
              "id": "profession"
            },
            {
              "value": "consultancy",
              "label": "Consultancy",
              "id": "profession"
            },
            {
              "value": "corporate banking",
              "label": "Corporate Banking",
              "id": "profession"
            },
            {
              "value": "global custody",
              "label": "Global Custody",
              "id": "profession"
            },
            {
              "value": "hedge funds",
              "label": "Hedge Funds",
              "id": "profession"
            },
            {
              "value": "insurance",
              "label": "Insurance",
              "id": "profession"
            },
            {
              "value": "investment banking",
              "label": "Investment Banking",
              "id": "profession"
            },
            {
              "value": "investment management",
              "label": "Investment Management",
              "id": "profession"
            },
            {
              "value": "journalism",
              "label": "Journalism",
              "id": "profession"
            },
            {
              "value": "legal",
              "label": "Legal",
              "id": "profession"
            },
            {
              "value": "private banking",
              "label": "Private Banking",
              "id": "profession"
            },
            {
              "value": "private equity & venture capital",
              "label": "Private Equity & Venture Capital",
              "id": "profession"
            },
            {
              "value": "public sector",
              "label": "Public Sector",
              "id": "profession"
            },
            {
              "value": "real estate",
              "label": "Real Estate",
              "id": "profession"
            },
            {
              "value": "recruitment",
              "label": "Recruitment",
              "id": "profession"
            },
            {
              "value": "retail banking",
              "label": "Retail Banking",
              "id": "profession"
            },
            {
              "value": "wealth management",
              "label": "Wealth Management",
              "id": "profession"
            },
            {
              "value": "other",
              "label": "Other",
              "id": "profession"
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.firm',
        fieldSchema: {
          type: String,
          control: "select",
          insertableIf: canInsert,
          editableIf: canEdit,
          publish: true,
          group: professionalGroup,
          optional: true,  //delete
          autoform: {
            options: [
              {
                "label": "--- please choose ---",
                "value": ""
              },
              {
                "value": "aberdeen-asset-management",
                "label": "Aberdeen Asset Management",
                "id": "firm"
              },
              {
                "value": "acadian-asset-management",
                "label": "Acadian Asset Management",
                "id": "firm"
              },
              {
                "value": "adam-and-company",
                "label": "Adam & Company",
                "id": "firm"
              },
              {
                "value": "advisorshares",
                "label": "Advisorshares",
                "id": "firm"
              },
              {
                "value": "affinity",
                "label": "Affinity",
                "id": "firm"
              },
              {
                "value": "allan-gray-investment-management",
                "label": "Allan Gray Investment Management",
                "id": "firm"
              },
              {
                "value": "allfunds-bank",
                "label": "Allfunds Bank",
                "id": "firm"
              },
              {
                "value": "alliance-trust",
                "label": "Alliance Trust",
                "id": "firm"
              },
              {
                "value": "alliancebernstein",
                "label": "Alliancebernstein",
                "id": "firm"
              },
              {
                "value": "american-century-investments",
                "label": "American Century Investments",
                "id": "firm"
              },
              {
                "value": "american-funds",
                "label": "American Funds",
                "id": "firm"
              },
              {
                "value": "american-international-group",
                "label": "American International Group",
                "id": "firm"
              },
              {
                "value": "ameriprise-financial",
                "label": "Ameriprise Financial",
                "id": "firm"
              },
              {
                "value": "amp-capital",
                "label": "Amp Capital",
                "id": "firm"
              },
              {
                "value": "amundi",
                "label": "Amundi",
                "id": "firm"
              },
              {
                "value": "aqr-capital-management",
                "label": "Aqr Capital Management",
                "id": "firm"
              },
              {
                "value": "arbuthnot-latham-private-bank",
                "label": "Arbuthnot Latham Private Bank",
                "id": "firm"
              },
              {
                "value": "ashburton-(jersey)-limited",
                "label": "Ashburton (Jersey) Limited",
                "id": "firm"
              },
              {
                "value": "ashcourt-rowan",
                "label": "Ashcourt Rowan",
                "id": "firm"
              },
              {
                "value": "ashmore-group",
                "label": "Ashmore Group",
                "id": "firm"
              },
              {
                "value": "asia-frontier-capital-ltd.",
                "label": "Asia Frontier Capital Ltd.",
                "id": "firm"
              },
              {
                "value": "aviva-investors",
                "label": "Aviva Investors",
                "id": "firm"
              },
              {
                "value": "axa-multimanager-limited",
                "label": "Axa Multimanager Limited",
                "id": "firm"
              },
              {
                "value": "azimut-holding",
                "label": "Azimut Holding",
                "id": "firm"
              },
              {
                "value": "baillie-gifford",
                "label": "Baillie Gifford",
                "id": "firm"
              },
              {
                "value": "bain-capital",
                "label": "Bain Capital",
                "id": "firm"
              },
              {
                "value": "banque-havilland",
                "label": "Banque Havilland",
                "id": "firm"
              },
              {
                "value": "barclays-wealth",
                "label": "Barclays Wealth",
                "id": "firm"
              },
              {
                "value": "bedrock-group",
                "label": "Bedrock Group",
                "id": "firm"
              },
              {
                "value": "berenberg-private-bank",
                "label": "Berenberg Private Bank",
                "id": "firm"
              },
              {
                "value": "bestinvest",
                "label": "Bestinvest",
                "id": "firm"
              },
              {
                "value": "blackrock",
                "label": "Blackrock",
                "id": "firm"
              },
              {
                "value": "boa-merill-lynch",
                "label": "Boa Merill Lynch",
                "id": "firm"
              },
              {
                "value": "bluebay-asset-management",
                "label": "Bluebay Asset Management",
                "id": "firm"
              },
              {
                "value": "bnp-paribas-investment-partners",
                "label": "Bnp Paribas Investment Partners",
                "id": "firm"
              },
              {
                "value": "bnp-paribas-wealth-management",
                "label": "Bnp Paribas Wealth Management",
                "id": "firm"
              },
              {
                "value": "bny-mellon",
                "label": "Bny Mellon",
                "id": "firm"
              },
              {
                "value": "boston-associates",
                "label": "Boston Associates",
                "id": "firm"
              },
              {
                "value": "bouwfonds",
                "label": "Bouwfonds",
                "id": "firm"
              },
              {
                "value": "brewin-dolphin",
                "label": "Brewin Dolphin",
                "id": "firm"
              },
              {
                "value": "bridgewater-associates",
                "label": "Bridgewater Associates",
                "id": "firm"
              },
              {
                "value": "brompton-asset-management",
                "label": "Brompton Asset Management",
                "id": "firm"
              },
              {
                "value": "brooks-macdonald",
                "label": "Brooks Macdonald",
                "id": "firm"
              },
              {
                "value": "brown-advisory",
                "label": "Brown Advisory",
                "id": "firm"
              },
              {
                "value": "brown-shipley",
                "label": "Brown Shipley",
                "id": "firm"
              },
              {
                "value": "c-hoare-and-co.",
                "label": "C Hoare & Co.",
                "id": "firm"
              },
              {
                "value": "calamos",
                "label": "Calamos",
                "id": "firm"
              },
              {
                "value": "cambridge-associates",
                "label": "Cambridge Associates",
                "id": "firm"
              },
              {
                "value": "canaccord-genuity-wealth-management",
                "label": "Canaccord Genuity Wealth Management",
                "id": "firm"
              },
              {
                "value": "capital-dynamics",
                "label": "Capital Dynamics",
                "id": "firm"
              },
              {
                "value": "capital-group-companies",
                "label": "Capital Group Companies",
                "id": "firm"
              },
              {
                "value": "cardale",
                "label": "Cardale",
                "id": "firm"
              },
              {
                "value": "cazenove-capital-management",
                "label": "Cazenove Capital Management",
                "id": "firm"
              },
              {
                "value": "charles-schwab",
                "label": "Charles Schwab",
                "id": "firm"
              },
              {
                "value": "charles-stanley",
                "label": "Charles Stanley",
                "id": "firm"
              },
              {
                "value": "children's-mutual",
                "label": "Children'S Mutual",
                "id": "firm"
              },
              {
                "value": "church-house",
                "label": "Church House",
                "id": "firm"
              },
              {
                "value": "citi-private-bank",
                "label": "Citi Private Bank",
                "id": "firm"
              },
              {
                "value": "citigroup",
                "label": "Citigroup",
                "id": "firm"
              },
              {
                "value": "city-asset-management",
                "label": "City Asset Management",
                "id": "firm"
              },
              {
                "value": "clarity-capital",
                "label": "Clarity Capital",
                "id": "firm"
              },
              {
                "value": "clarium-capital",
                "label": "Clarium Capital",
                "id": "firm"
              },
              {
                "value": "climate-change-capital",
                "label": "Climate Change Capital",
                "id": "firm"
              },
              {
                "value": "close-brothers-asset-management",
                "label": "Close Brothers Asset Management",
                "id": "firm"
              },
              {
                "value": "columbia-management-group",
                "label": "Columbia Management Group",
                "id": "firm"
              },
              {
                "value": "cordiant-capital-inc.",
                "label": "Cordiant Capital Inc.",
                "id": "firm"
              },
              {
                "value": "coronation-fund-managers (south-africa)",
                "label": "Coronation Fund Managers (South Africa)",
                "id": "firm"
              },
              {
                "value": "coutts-and-co.",
                "label": "Coutts & Co.",
                "id": "firm"
              },
              {
                "value": "covestor",
                "label": "Covestor",
                "id": "firm"
              },
              {
                "value": "crédit-agricole",
                "label": "Crédit Agricole",
                "id": "firm"
              },
              {
                "value": "credit-suisse-asset-management",
                "label": "Credit Suisse Asset Management",
                "id": "firm"
              },
              {
                "value": "credit-suisse-private-banking",
                "label": "Credit Suisse Private Banking",
                "id": "firm"
              },
              {
                "value": "crossroads-group",
                "label": "Crossroads Group",
                "id": "firm"
              },
              {
                "value": "darwinex",
                "label": "Darwinex",
                "id": "firm"
              },
              {
                "value": "deutsche-asset-and-wealth-management",
                "label": "Deutsche Asset & Wealth Management",
                "id": "firm"
              },
              {
                "value": "dimensional-fund-advisors",
                "label": "Dimensional Fund Advisors",
                "id": "firm"
              },
              {
                "value": "dodge-and-cox",
                "label": "Dodge & Cox",
                "id": "firm"
              },
              {
                "value": "dreyfus-corporation",
                "label": "Dreyfus Corporation",
                "id": "firm"
              },
              {
                "value": "duncan-lawrie-private-banking",
                "label": "Duncan Lawrie Private Banking",
                "id": "firm"
              },
              {
                "value": "eaton-vance",
                "label": "Eaton Vance",
                "id": "firm"
              },
              {
                "value": "edinburgh-partners-ltd",
                "label": "Edinburgh Partners Ltd",
                "id": "firm"
              },
              {
                "value": "edward-jones-investments",
                "label": "Edward Jones Investments",
                "id": "firm"
              },
              {
                "value": "efg-hermes",
                "label": "Efg-Hermes",
                "id": "firm"
              },
              {
                "value": "emirates-nbd-bank",
                "label": "Emirates Nbd Bank",
                "id": "firm"
              },
              {
                "value": "eq-investors-ltd",
                "label": "Eq Investors Ltd",
                "id": "firm"
              },
              {
                "value": "european-wealth-management",
                "label": "European Wealth Management",
                "id": "firm"
              },
              {
                "value": "bmo-global-asset-management",
                "label": "Bmo Global Asset Management",
                "id": "firm"
              },
              {
                "value": "falcon-private-wealth",
                "label": "Falcon Private Wealth",
                "id": "firm"
              },
              {
                "value": "federated-investors",
                "label": "Federated Investors",
                "id": "firm"
              },
              {
                "value": "fidelity",
                "label": "Fidelity",
                "id": "firm"
              },
              {
                "value": "first-command-financial-planning",
                "label": "First Command Financial Planning",
                "id": "firm"
              },
              {
                "value": "first-republic-bank",
                "label": "First Republic Bank",
                "id": "firm"
              },
              {
                "value": "firstrade-securities",
                "label": "Firstrade Securities",
                "id": "firm"
              },
              {
                "value": "fisher-investments",
                "label": "Fisher Investments",
                "id": "firm"
              },
              {
                "value": "fisher-wealth-management",
                "label": "Fisher Wealth Management",
                "id": "firm"
              },
              {
                "value": "franklin-templeton-investments",
                "label": "Franklin Templeton Investments",
                "id": "firm"
              },
              {
                "value": "fremont-group",
                "label": "Fremont Group",
                "id": "firm"
              },
              {
                "value": "gam",
                "label": "Gam",
                "id": "firm"
              },
              {
                "value": "gamco-investors",
                "label": "Gamco Investors",
                "id": "firm"
              },
              {
                "value": "gbc-asset-management",
                "label": "Gbc Asset Management",
                "id": "firm"
              },
              {
                "value": "generation-investment-management",
                "label": "Generation Investment Management",
                "id": "firm"
              },
              {
                "value": "global-investment-house",
                "label": "Global Investment House",
                "id": "firm"
              },
              {
                "value": "gluskin-sheff",
                "label": "Gluskin Sheff",
                "id": "firm"
              },
              {
                "value": "goldman-sachs",
                "label": "Goldman Sachs",
                "id": "firm"
              },
              {
                "value": "goldman-sachs-wealth-management",
                "label": "Goldman Sachs Wealth Management",
                "id": "firm"
              },
              {
                "value": "guardian-capital-group",
                "label": "Guardian Capital Group",
                "id": "firm"
              },
              {
                "value": "gwm-investment-management",
                "label": "Gwm Investment Management",
                "id": "firm"
              },
              {
                "value": "handelsbanken",
                "label": "Handelsbanken",
                "id": "firm"
              },
              {
                "value": "hansa-capital",
                "label": "Hansa Capital",
                "id": "firm"
              },
              {
                "value": "harbert-management-corporation",
                "label": "Harbert Management Corporation",
                "id": "firm"
              },
              {
                "value": "harbourvest-partners",
                "label": "Harbourvest Partners",
                "id": "firm"
              },
              {
                "value": "hargreave-hale",
                "label": "Hargreave Hale",
                "id": "firm"
              },
              {
                "value": "hargreaves-lansdown",
                "label": "Hargreaves Lansdown",
                "id": "firm"
              },
              {
                "value": "heartwood-group",
                "label": "Heartwood Group",
                "id": "firm"
              },
              {
                "value": "heartwood-wealth",
                "label": "Heartwood Wealth",
                "id": "firm"
              },
              {
                "value": "henderson-rowe",
                "label": "Henderson Rowe",
                "id": "firm"
              },
              {
                "value": "hottinger",
                "label": "Hottinger",
                "id": "firm"
              },
              {
                "value": "hsbc-asset-management",
                "label": "Hsbc Asset Management",
                "id": "firm"
              },
              {
                "value": "hsbc-private-bank",
                "label": "Hsbc Private Bank",
                "id": "firm"
              },
              {
                "value": "idfc-project-equity",
                "label": "Idfc Project Equity",
                "id": "firm"
              },
              {
                "value": "ing-group",
                "label": "Ing Group",
                "id": "firm"
              },
              {
                "value": "insight-investment",
                "label": "Insight Investment",
                "id": "firm"
              },
              {
                "value": "interactive-brokers",
                "label": "Interactive Brokers",
                "id": "firm"
              },
              {
                "value": "invesco-perpetual",
                "label": "Invesco Perpetual",
                "id": "firm"
              },
              {
                "value": "investcorp",
                "label": "Investcorp",
                "id": "firm"
              },
              {
                "value": "investec-asset-management",
                "label": "Investec Asset Management",
                "id": "firm"
              },
              {
                "value": "investec-wealth-and-investment",
                "label": "Investec Wealth & Investment",
                "id": "firm"
              },
              {
                "value": "investment-solutions",
                "label": "Investment Solutions",
                "id": "firm"
              },
              {
                "value": "iveagh",
                "label": "Iveagh",
                "id": "firm"
              },
              {
                "value": "j-m-finn",
                "label": "J M Finn",
                "id": "firm"
              },
              {
                "value": "j.-and-w.-seligman-and-co.",
                "label": "J. & W. Seligman & Co.",
                "id": "firm"
              },
              {
                "value": "j.p.-morgan-asset-management",
                "label": "J.P. Morgan Asset Management",
                "id": "firm"
              },
              {
                "value": "james-hambro-and-partners",
                "label": "James Hambro & Partners",
                "id": "firm"
              },
              {
                "value": "janus-capital-group",
                "label": "Janus Capital Group",
                "id": "firm"
              },
              {
                "value": "janus-henderson",
                "label": "Janus Henderson",
                "id": "firm"
              },
              {
                "value": "jefferies-wealth-management",
                "label": "Jefferies Wealth Management",
                "id": "firm"
              },
              {
                "value": "jlt-group",
                "label": "Jlt Group",
                "id": "firm"
              },
              {
                "value": "jp-morgan-private-bank",
                "label": "Jp Morgan Private Bank",
                "id": "firm"
              },
              {
                "value": "julius-baer",
                "label": "Julius Baer",
                "id": "firm"
              },
              {
                "value": "jupiter-fund-management",
                "label": "Jupiter Fund Management",
                "id": "firm"
              },
              {
                "value": "kbc",
                "label": "Kbc",
                "id": "firm"
              },
              {
                "value": "killik-and-co.",
                "label": "Killik & Co.",
                "id": "firm"
              },
              {
                "value": "kingdom-holding-company",
                "label": "Kingdom Holding Company",
                "id": "firm"
              },
              {
                "value": "kleinwort-benson",
                "label": "Kleinwort Benson",
                "id": "firm"
              },
              {
                "value": "knight-vinke-asset-management",
                "label": "Knight Vinke Asset Management",
                "id": "firm"
              },
              {
                "value": "legal-and-general",
                "label": "Legal & General",
                "id": "firm"
              },
              {
                "value": "legg-mason",
                "label": "Legg Mason",
                "id": "firm"
              },
              {
                "value": "lgt-group",
                "label": "Lgt Group",
                "id": "firm"
              },
              {
                "value": "liongate-capital-management",
                "label": "Liongate Capital Management",
                "id": "firm"
              },
              {
                "value": "lloyds-private-banking",
                "label": "Lloyds Private Banking",
                "id": "firm"
              },
              {
                "value": "lombard-odier",
                "label": "Lombard Odier",
                "id": "firm"
              },
              {
                "value": "london-and-capital",
                "label": "London & Capital",
                "id": "firm"
              },
              {
                "value": "lord-abbett",
                "label": "Lord Abbett",
                "id": "firm"
              },
              {
                "value": "lyxor-asset-management",
                "label": "Lyxor Asset Management",
                "id": "firm"
              },
              {
                "value": "mandg-investments",
                "label": "M&G Investments",
                "id": "firm"
              },
              {
                "value": "mackenzie-investments",
                "label": "Mackenzie Investments",
                "id": "firm"
              },
              {
                "value": "macquarie-group",
                "label": "Macquarie Group",
                "id": "firm"
              },
              {
                "value": "mfs-investment-management",
                "label": "Mfs Investment Management",
                "id": "firm"
              },
              {
                "value": "mirae-asset-group",
                "label": "Mirae Asset Group",
                "id": "firm"
              },
              {
                "value": "morgan-stanley",
                "label": "Morgan Stanley",
                "id": "firm"
              },
              {
                "value": "morningstar",
                "label": "Morningstar",
                "id": "firm"
              },
              {
                "value": "nbk-capital",
                "label": "Nbk Capital",
                "id": "firm"
              },
              {
                "value": "neuberger-berman",
                "label": "Neuberger Berman",
                "id": "firm"
              },
              {
                "value": "new-york-life-investment-management",
                "label": "New York Life Investment Management",
                "id": "firm"
              },
              {
                "value": "nomura-group",
                "label": "Nomura Group",
                "id": "firm"
              },
              {
                "value": "northern-trust",
                "label": "Northern Trust",
                "id": "firm"
              },
              {
                "value": "nuveen-investments",
                "label": "Nuveen Investments",
                "id": "firm"
              },
              {
                "value": "odey-asset-management",
                "label": "Odey Asset Management",
                "id": "firm"
              },
              {
                "value": "odey-wealth",
                "label": "Odey Wealth",
                "id": "firm"
              },
              {
                "value": "old-mutual",
                "label": "Old Mutual",
                "id": "firm"
              },
              {
                "value": "pacific-investment-management-company",
                "label": "Pacific Investment Management Company",
                "id": "firm"
              },
              {
                "value": "panmure-gordon-and-co.",
                "label": "Panmure Gordon & Co.",
                "id": "firm"
              },
              {
                "value": "partners-group",
                "label": "Partners Group",
                "id": "firm"
              },
              {
                "value": "permal-group",
                "label": "Permal Group",
                "id": "firm"
              },
              {
                "value": "pictet",
                "label": "Pictet",
                "id": "firm"
              },
              {
                "value": "pilling-and-co",
                "label": "Pilling & Co",
                "id": "firm"
              },
              {
                "value": "pioneer-investments",
                "label": "Pioneer Investments",
                "id": "firm"
              },
              {
                "value": "plurimi-wealth",
                "label": "Plurimi Wealth",
                "id": "firm"
              },
              {
                "value": "premier-asset-management",
                "label": "Premier Asset Management",
                "id": "firm"
              },
              {
                "value": "principal-financial-group",
                "label": "Principal Financial Group",
                "id": "firm"
              },
              {
                "value": "prudential-financial",
                "label": "Prudential Financial",
                "id": "firm"
              },
              {
                "value": "prudential-property-investment-managers",
                "label": "Prudential Property Investment Managers",
                "id": "firm"
              },
              {
                "value": "psigma-investment-management",
                "label": "Psigma Investment Management",
                "id": "firm"
              },
              {
                "value": "pti-securities-and-futures",
                "label": "Pti Securities & Futures",
                "id": "firm"
              },
              {
                "value": "putnam-investments",
                "label": "Putnam Investments",
                "id": "firm"
              },
              {
                "value": "qatar-investment-authority",
                "label": "Qatar Investment Authority",
                "id": "firm"
              },
              {
                "value": "quilter-cheviot-investment-management",
                "label": "Quilter Cheviot Investment Management",
                "id": "firm"
              },
              {
                "value": "rathbones-investment-management-limited",
                "label": "Rathbones Investment Management Limited",
                "id": "firm"
              },
              {
                "value": "raymond-james",
                "label": "Raymond James",
                "id": "firm"
              },
              {
                "value": "rbc",
                "label": "Rbc",
                "id": "firm"
              },
              {
                "value": "richmond-house-group",
                "label": "Richmond House Group",
                "id": "firm"
              },
              {
                "value": "rlj-companies",
                "label": "Rlj Companies",
                "id": "firm"
              },
              {
                "value": "robeco",
                "label": "Robeco",
                "id": "firm"
              },
              {
                "value": "rothschild",
                "label": "Rothschild",
                "id": "firm"
              },
              {
                "value": "royal-bank-of-canada",
                "label": "Royal Bank Of Canada",
                "id": "firm"
              },
              {
                "value": "royal-london-asset-management",
                "label": "Royal London Asset Management",
                "id": "firm"
              },
              {
                "value": "ruane,-cunniff-and-goldfarb",
                "label": "Ruane, Cunniff & Goldfarb",
                "id": "firm"
              },
              {
                "value": "russell-investments (northwestern-mutual)",
                "label": "Russell Investments (Northwestern Mutual)",
                "id": "firm"
              },
              {
                "value": "sandp-",
                "label": "S&P",
                "id": "firm"
              },
              {
                "value": "sageview-capital",
                "label": "Sageview Capital",
                "id": "firm"
              },
              {
                "value": "saltus-investment-management",
                "label": "Saltus Investment Management",
                "id": "firm"
              },
              {
                "value": "sanderson-house",
                "label": "Sanderson House",
                "id": "firm"
              },
              {
                "value": "sanlam",
                "label": "Sanlam",
                "id": "firm"
              },
              {
                "value": "santander-group",
                "label": "Santander Group",
                "id": "firm"
              },
              {
                "value": "sarasin-",
                "label": "Sarasin",
                "id": "firm"
              },
              {
                "value": "saunderson-house",
                "label": "Saunderson House",
                "id": "firm"
              },
              {
                "value": "scd-and-co.",
                "label": "Scd & Co.",
                "id": "firm"
              },
              {
                "value": "schroders",
                "label": "Schroders",
                "id": "firm"
              },
              {
                "value": "scm-private",
                "label": "Scm Private",
                "id": "firm"
              },
              {
                "value": "scottish-mortgage-investment-trust",
                "label": "Scottish Mortgage Investment Trust",
                "id": "firm"
              },
              {
                "value": "scottish-widows",
                "label": "Scottish Widows",
                "id": "firm"
              },
              {
                "value": "sei-investments",
                "label": "Sei Investments",
                "id": "firm"
              },
              {
                "value": "seven-investment-management-(7im)",
                "label": "Seven Investment Management (7Im)",
                "id": "firm"
              },
              {
                "value": "sg-wealth-management",
                "label": "Sg Wealth Management",
                "id": "firm"
              },
              {
                "value": "sgpb-hambros",
                "label": "Sgpb Hambros",
                "id": "firm"
              },
              {
                "value": "signia-wealth",
                "label": "Signia Wealth",
                "id": "firm"
              },
              {
                "value": "sinopac-financial-holdings",
                "label": "Sinopac Financial Holdings",
                "id": "firm"
              },
              {
                "value": "skagen-funds",
                "label": "Skagen Funds",
                "id": "firm"
              },
              {
                "value": "smith-and-williamson",
                "label": "Smith & Williamson",
                "id": "firm"
              },
              {
                "value": "soc-gen-private-bank",
                "label": "Soc Gen Private Bank",
                "id": "firm"
              },
              {
                "value": "square-mile",
                "label": "Square Mile",
                "id": "firm"
              },
              {
                "value": "st-james’s-place-wealth-management",
                "label": "St James’S Place Wealth Management",
                "id": "firm"
              },
              {
                "value": "standard-chartered-private-bank",
                "label": "Standard Chartered Private Bank",
                "id": "firm"
              },
              {
                "value": "standard-life-asset-mangement",
                "label": "Standard Life Asset Mangement",
                "id": "firm"
              },
              {
                "value": "standard-life-wealth",
                "label": "Standard Life Wealth",
                "id": "firm"
              },
              {
                "value": "stanford-financial-group",
                "label": "Stanford Financial Group",
                "id": "firm"
              },
              {
                "value": "stanhope-capital-",
                "label": "Stanhope Capital",
                "id": "firm"
              },
              {
                "value": "stanlib",
                "label": "Stanlib",
                "id": "firm"
              },
              {
                "value": "state-farm-insurance",
                "label": "State Farm Insurance",
                "id": "firm"
              },
              {
                "value": "stichting-pensioenfonds-abp",
                "label": "Stichting Pensioenfonds Abp",
                "id": "firm"
              },
              {
                "value": "stichting-pensioenfonds-zorg-en-welzijn",
                "label": "Stichting Pensioenfonds Zorg En Welzijn",
                "id": "firm"
              },
              {
                "value": "stifel",
                "label": "Stifel",
                "id": "firm"
              },
              {
                "value": "stodir",
                "label": "Stodir",
                "id": "firm"
              },
              {
                "value": "sun-life-financial",
                "label": "Sun Life Financial",
                "id": "firm"
              },
              {
                "value": "superfund-group",
                "label": "Superfund Group",
                "id": "firm"
              },
              {
                "value": "svg-capital",
                "label": "Svg Capital",
                "id": "firm"
              },
              {
                "value": "syz",
                "label": "Syz",
                "id": "firm"
              },
              {
                "value": "t.-rowe-price",
                "label": "T. Rowe Price",
                "id": "firm"
              },
              {
                "value": "tcw-group",
                "label": "Tcw Group",
                "id": "firm"
              },
              {
                "value": "thames-river",
                "label": "Thames River",
                "id": "firm"
              },
              {
                "value": "the-hartford",
                "label": "The Hartford",
                "id": "firm"
              },
              {
                "value": "thomas-miller",
                "label": "Thomas Miller",
                "id": "firm"
              },
              {
                "value": "tiaa–cref",
                "label": "Tiaa–Cref",
                "id": "firm"
              },
              {
                "value": "tilney-bestinvest",
                "label": "Tilney Bestinvest",
                "id": "firm"
              },
              {
                "value": "timothy-james",
                "label": "Timothy James",
                "id": "firm"
              },
              {
                "value": "towers-watson",
                "label": "Towers Watson",
                "id": "firm"
              },
              {
                "value": "towry",
                "label": "Towry",
                "id": "firm"
              },
              {
                "value": "tsai-capital",
                "label": "Tsai Capital",
                "id": "firm"
              },
              {
                "value": "ubs",
                "label": "Ubs",
                "id": "firm"
              },
              {
                "value": "union-bancaire-privee-(ubp)",
                "label": "Union Bancaire Privee (Ubp)",
                "id": "firm"
              },
              {
                "value": "union-investment",
                "label": "Union Investment",
                "id": "firm"
              },
              {
                "value": "value-line",
                "label": "Value Line",
                "id": "firm"
              },
              {
                "value": "value-partners",
                "label": "Value Partners",
                "id": "firm"
              },
              {
                "value": "vestra-wealth",
                "label": "Vestra Wealth",
                "id": "firm"
              },
              {
                "value": "virtus-investment-partners",
                "label": "Virtus Investment Partners",
                "id": "firm"
              },
              {
                "value": "waddell-and-reed",
                "label": "Waddell & Reed",
                "id": "firm"
              },
              {
                "value": "walden-asset-management",
                "label": "Walden Asset Management",
                "id": "firm"
              },
              {
                "value": "walker-crips",
                "label": "Walker Crips",
                "id": "firm"
              },
              {
                "value": "waverton-investment-management",
                "label": "Waverton Investment Management",
                "id": "firm"
              },
              {
                "value": "wellington-management-company",
                "label": "Wellington Management Company",
                "id": "firm"
              },
              {
                "value": "wells-fargo",
                "label": "Wells Fargo",
                "id": "firm"
              },
              {
                "value": "wh-ireland",
                "label": "Wh Ireland",
                "id": "firm"
              },
              {
                "value": "william-blair-and-company",
                "label": "William Blair & Company",
                "id": "firm"
              },
              {
                "value": "williams-debroe",
                "label": "Williams Debroe",
                "id": "firm"
              },
              {
                "value": "wilshire-associates",
                "label": "Wilshire Associates",
                "id": "firm"
              },
              {
                "value": "wisdomtree-investments",
                "label": "Wisdomtree Investments",
                "id": "firm"
              },
              {
                "value": "zurich-financial-services",
                "label": "Zurich Financial Services",
                "id": "firm"
              }
            ]
          }
        }
    },
    {
      fieldName: 'profile.department',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        optional: true,  //delete
        autoform: {
          options: [
            {
              "label": "--- please choose ---",
              "value": "",
              "id": "department"
            },
            {
              "value": "accounting-and-finance",
              "label": "Accounting & Finance",
              "id": "department"
            },
            {
              "value": "communications-investor-relations-and-pr",
              "label": "Communications, Investor Relations & PR",
              "id": "department"
            },
            {
              "value": "compliance",
              "label": "Compliance",
              "id": "department"
            },
            {
              "value": "human-resources",
              "label": "Human Resources",
              "id": "department"
            },
            {
              "value": "information-technology",
              "label": "Information Technology",
              "id": "department"
            },
            {
              "value": "investments",
              "label": "Investments",
              "id": "department"
            },
            {
              "value": "legal",
              "label": "Legal",
              "id": "department"
            },
            {
              "value": "management",
              "label": "Management",
              "id": "department"
            },
            {
              "value": "marketing-and-product-strategy",
              "label": "Marketing & Product Strategy",
              "id": "department"
            },
            {
              "value": "operations",
              "label": "Operations",
              "id": "department"
            },
            {
              "value": "risk-and-compliance",
              "label": "Risk and compliance",
              "id": "department"
            },
            {
              "value": "sales-and-distribution",
              "label": "Sales and distribution",
              "id": "department"
            },
            {
              "value": "other",
              "label": "Other",
              "id": "department"
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.jobFunction',
      fieldSchema: {
        type: String,
        control: "select",
        // label: "Job Function",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        optional: true,  //delete
        autoform: {
          options: [
            {
              "value": ".net developer",
              "label": ".NET Developer",
              "id": "jobFunction"
            },
            {
              "value": "account director",
              "label": "Account Director",
              "id": "jobFunction"
            },
            {
              "value": "account manager",
              "label": "Account Manager",
              "id": "jobFunction"
            },
            {
              "value": "accountant",
              "label": "Accountant",
              "id": "jobFunction"
            },
            {
              "value": "accounting manager",
              "label": "Accounting Manager",
              "id": "jobFunction"
            },
            {
              "value": "accounts assistant",
              "label": "Accounts Assistant",
              "id": "jobFunction"
            },
            {
              "value": "actuarial analyst",
              "label": "Actuarial Analyst",
              "id": "jobFunction"
            },
            {
              "value": "actuarial manager",
              "label": "Actuarial Manager",
              "id": "jobFunction"
            },
            {
              "value": "administrative assistant",
              "label": "Administrative Assistant",
              "id": "jobFunction"
            },
            {
              "value": "aml analyst",
              "label": "AML Analyst",
              "id": "jobFunction"
            },
            {
              "value": "aml manager",
              "label": "AML Manager",
              "id": "jobFunction"
            },
            {
              "value": "aml specialist",
              "label": "AML Specialist",
              "id": "jobFunction"
            },
            {
              "value": "analyst programmer",
              "label": "Analyst Programmer",
              "id": "jobFunction"
            },
            {
              "value": "analyst",
              "label": "Analyst",
              "id": "jobFunction"
            },
            {
              "value": "application development manager",
              "label": "Application Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "apprenticeship",
              "label": "Apprenticeship",
              "id": "jobFunction"
            },
            {
              "value": "application support analyst",
              "label": "Application Support Analyst",
              "id": "jobFunction"
            },
            {
              "value": "application support",
              "label": "Application Support",
              "id": "jobFunction"
            },
            {
              "value": "assistant accountant",
              "label": "Assistant Accountant",
              "id": "jobFunction"
            },
            {
              "value": "assistant company secretary",
              "label": "Assistant Company Secretary",
              "id": "jobFunction"
            },
            {
              "value": "assistant controller",
              "label": "Assistant Controller",
              "id": "jobFunction"
            },
            {
              "value": "assistant finance manager",
              "label": "Assistant Finance Manager",
              "id": "jobFunction"
            },
            {
              "value": "assistant manager",
              "label": "Assistant Manager",
              "id": "jobFunction"
            },
            {
              "value": "assistant portfolio manager",
              "label": "Assistant Portfolio Manager",
              "id": "jobFunction"
            },
            {
              "value": "assistant private banker",
              "label": "Assistant Private Banker",
              "id": "jobFunction"
            },
            {
              "value": "assistant relationship manager",
              "label": "Assistant Relationship Manager",
              "id": "jobFunction"
            },
            {
              "value": "associate analyst",
              "label": "Associate Analyst",
              "id": "jobFunction"
            },
            {
              "value": "associate consultant",
              "label": "Associate Consultant",
              "id": "jobFunction"
            },
            {
              "value": "associate corporate finance",
              "label": "Associate Corporate Finance",
              "id": "jobFunction"
            },
            {
              "value": "associate director",
              "label": "Associate Director",
              "id": "jobFunction"
            },
            {
              "value": "associate",
              "label": "Associate",
              "id": "jobFunction"
            },
            {
              "value": "audit manager financial markets",
              "label": "Audit Manager Financial Markets",
              "id": "jobFunction"
            },
            {
              "value": "audit manager",
              "label": "Audit Manager",
              "id": "jobFunction"
            },
            {
              "value": "audit senior",
              "label": "Audit Senior",
              "id": "jobFunction"
            },
            {
              "value": "auditor",
              "label": "Auditor",
              "id": "jobFunction"
            },
            {
              "value": "branch manager",
              "label": "Branch Manager",
              "id": "jobFunction"
            },
            {
              "value": "business analyst asset management",
              "label": "Business Analyst Asset Management",
              "id": "jobFunction"
            },
            {
              "value": "business analyst",
              "label": "Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "business consultant",
              "label": "Business Consultant",
              "id": "jobFunction"
            },
            {
              "value": "business continuity manager",
              "label": "Business Continuity Manager",
              "id": "jobFunction"
            },
            {
              "value": "business controller",
              "label": "Business Controller",
              "id": "jobFunction"
            },
            {
              "value": "business data analyst",
              "label": "Business Data Analyst",
              "id": "jobFunction"
            },
            {
              "value": "business development analyst",
              "label": "Business Development Analyst",
              "id": "jobFunction"
            },
            {
              "value": "business development associate",
              "label": "Business Development Associate",
              "id": "jobFunction"
            },
            {
              "value": "business development director",
              "label": "Business Development Director",
              "id": "jobFunction"
            },
            {
              "value": "business development executive",
              "label": "Business Development Executive",
              "id": "jobFunction"
            },
            {
              "value": "business development manager",
              "label": "Business Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "business development",
              "label": "Business Development",
              "id": "jobFunction"
            },
            {
              "value": "business intelligence analyst",
              "label": "Business Intelligence Analyst",
              "id": "jobFunction"
            },
            {
              "value": "business manager",
              "label": "Business Manager",
              "id": "jobFunction"
            },
            {
              "value": "business partner",
              "label": "Business Partner",
              "id": "jobFunction"
            },
            {
              "value": "business process analyst",
              "label": "Business Process Analyst",
              "id": "jobFunction"
            },
            {
              "value": "business risk manager",
              "label": "Business Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "business unit controller",
              "label": "Business Unit Controller",
              "id": "jobFunction"
            },
            {
              "value": "c++ developer",
              "label": "C++ Developer",
              "id": "jobFunction"
            },
            {
              "value": "cfo",
              "label": "CFO",
              "id": "jobFunction"
            },
            {
              "value": "change manager",
              "label": "Change Manager",
              "id": "jobFunction"
            },
            {
              "value": "change project manager",
              "label": "Change Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "chief compliance officer",
              "label": "Chief Compliance Officer",
              "id": "jobFunction"
            },
            {
              "value": "chief executive officer",
              "label": "Chief Executive Officer",
              "id": "jobFunction"
            },
            {
              "value": "chief financial officer",
              "label": "Chief Financial Officer",
              "id": "jobFunction"
            },
            {
              "value": "chief investment officer",
              "label": "Chief Investment Officer",
              "id": "jobFunction"
            },
            {
              "value": "chief operating officer",
              "label": "Chief Operating Officer",
              "id": "jobFunction"
            },
            {
              "value": "chief risk officer",
              "label": "Chief Risk Officer",
              "id": "jobFunction"
            },
            {
              "value": "client account manager",
              "label": "Client Account Manager",
              "id": "jobFunction"
            },
            {
              "value": "client relationship manager",
              "label": "Client Relationship Manager",
              "id": "jobFunction"
            },
            {
              "value": "client reporting analyst",
              "label": "Client Reporting Analyst",
              "id": "jobFunction"
            },
            {
              "value": "client reporting associate",
              "label": "Client Reporting Associate",
              "id": "jobFunction"
            },
            {
              "value": "client service associate",
              "label": "Client Service Associate",
              "id": "jobFunction"
            },
            {
              "value": "client service executive",
              "label": "Client Service Executive",
              "id": "jobFunction"
            },
            {
              "value": "client service manager",
              "label": "Client Service Manager",
              "id": "jobFunction"
            },
            {
              "value": "client service specialist",
              "label": "Client Service Specialist",
              "id": "jobFunction"
            },
            {
              "value": "client services analyst",
              "label": "Client Services Analyst",
              "id": "jobFunction"
            },
            {
              "value": "client services associate",
              "label": "Client Services Associate",
              "id": "jobFunction"
            },
            {
              "value": "client services executive",
              "label": "Client Services Executive",
              "id": "jobFunction"
            },
            {
              "value": "client services manager",
              "label": "Client Services Manager",
              "id": "jobFunction"
            },
            {
              "value": "client services",
              "label": "Client Services",
              "id": "jobFunction"
            },
            {
              "value": "collateral management analyst",
              "label": "Collateral Management Analyst",
              "id": "jobFunction"
            },
            {
              "value": "commercial manager",
              "label": "Commercial Manager",
              "id": "jobFunction"
            },
            {
              "value": "communications manager",
              "label": "Communications Manager",
              "id": "jobFunction"
            },
            {
              "value": "company secretary",
              "label": "Company Secretary",
              "id": "jobFunction"
            },
            {
              "value": "compliance advisor",
              "label": "Compliance Advisor",
              "id": "jobFunction"
            },
            {
              "value": "compliance analyst",
              "label": "Compliance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "compliance assistant",
              "label": "Compliance Assistant",
              "id": "jobFunction"
            },
            {
              "value": "compliance associate",
              "label": "Compliance Associate",
              "id": "jobFunction"
            },
            {
              "value": "compliance consultant",
              "label": "Compliance Consultant",
              "id": "jobFunction"
            },
            {
              "value": "compliance director",
              "label": "Compliance Director",
              "id": "jobFunction"
            },
            {
              "value": "compliance manager",
              "label": "Compliance Manager",
              "id": "jobFunction"
            },
            {
              "value": "compliance monitoring analyst",
              "label": "Compliance Monitoring Analyst",
              "id": "jobFunction"
            },
            {
              "value": "compliance monitoring manager",
              "label": "Compliance Monitoring Manager",
              "id": "jobFunction"
            },
            {
              "value": "compliance monitoring officer",
              "label": "Compliance Monitoring Officer",
              "id": "jobFunction"
            },
            {
              "value": "compliance monitoring",
              "label": "Compliance Monitoring",
              "id": "jobFunction"
            },
            {
              "value": "compliance officer",
              "label": "Compliance Officer",
              "id": "jobFunction"
            },
            {
              "value": "compliance specialist",
              "label": "Compliance Specialist",
              "id": "jobFunction"
            },
            {
              "value": "consultant",
              "label": "Consultant",
              "id": "jobFunction"
            },
            {
              "value": "controller",
              "label": "Controller",
              "id": "jobFunction"
            },
            {
              "value": "core java developer",
              "label": "Core Java Developer",
              "id": "jobFunction"
            },
            {
              "value": "corporate accountant",
              "label": "Corporate Accountant",
              "id": "jobFunction"
            },
            {
              "value": "corporate actions analyst",
              "label": "Corporate Actions Analyst",
              "id": "jobFunction"
            },
            {
              "value": "corporate credit analyst",
              "label": "Corporate Credit Analyst",
              "id": "jobFunction"
            },
            {
              "value": "corporate development manager",
              "label": "Corporate Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "corporate finance analyst",
              "label": "Corporate Finance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "corporate finance associate",
              "label": "Corporate Finance Associate",
              "id": "jobFunction"
            },
            {
              "value": "corporate finance manager",
              "label": "Corporate Finance Manager",
              "id": "jobFunction"
            },
            {
              "value": "credit analyst",
              "label": "Credit Analyst",
              "id": "jobFunction"
            },
            {
              "value": "credit controller",
              "label": "Credit Controller",
              "id": "jobFunction"
            },
            {
              "value": "credit manager",
              "label": "Credit Manager",
              "id": "jobFunction"
            },
            {
              "value": "credit officer",
              "label": "credit officer",
              "id": "jobFunction"
            },
            {
              "value": "credit research analyst",
              "label": "Credit Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "credit risk analyst",
              "label": "Credit Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "credit risk business analyst",
              "label": "Credit Risk Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "credit risk manager",
              "label": "Credit Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "credit risk officer",
              "label": "Credit Risk Officer",
              "id": "jobFunction"
            },
            {
              "value": "customer service officer",
              "label": "Customer Service Officer",
              "id": "jobFunction"
            },
            {
              "value": "customer service representative",
              "label": "Customer Service Representative",
              "id": "jobFunction"
            },
            {
              "value": "data analyst",
              "label": "Data Analyst",
              "id": "jobFunction"
            },
            {
              "value": "data architect",
              "label": "Data Architect",
              "id": "jobFunction"
            },
            {
              "value": "data business analyst",
              "label": "Data Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "data manager",
              "label": "Data Manager",
              "id": "jobFunction"
            },
            {
              "value": "data scientist",
              "label": "Data Scientist",
              "id": "jobFunction"
            },
            {
              "value": "deputy head of compliance",
              "label": "Deputy head of Compliance",
              "id": "jobFunction"
            },
            {
              "value": "derivatives analyst",
              "label": "Derivatives Analyst",
              "id": "jobFunction"
            },
            {
              "value": "developer",
              "label": "Developer",
              "id": "jobFunction"
            },
            {
              "value": "development manager",
              "label": "Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "digital marketing manager",
              "label": "Digital Marketing Manager",
              "id": "jobFunction"
            },
            {
              "value": "director of finance",
              "label": "Director of Finance",
              "id": "jobFunction"
            },
            {
              "value": "due diligence analyst",
              "label": "Due Diligence Analyst",
              "id": "jobFunction"
            },
            {
              "value": "economist",
              "label": "Economist",
              "id": "jobFunction"
            },
            {
              "value": "editor",
              "label": "Editor",
              "id": "jobFunction"
            },
            {
              "value": "enterprise risk manager",
              "label": "Enterprise Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "environment manager",
              "label": "Environment Manager",
              "id": "jobFunction"
            },
            {
              "value": "equity analyst",
              "label": "Equity Analyst",
              "id": "jobFunction"
            },
            {
              "value": "equity research analyst",
              "label": "Equity Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "equity research associate",
              "label": "Equity Research Associate",
              "id": "jobFunction"
            },
            {
              "value": "equity sales",
              "label": "Equity Sales",
              "id": "jobFunction"
            },
            {
              "value": "equity trader",
              "label": "Equity Trader",
              "id": "jobFunction"
            },
            {
              "value": "execution trader",
              "label": "Execution Trader",
              "id": "jobFunction"
            },
            {
              "value": "executive assistant",
              "label": "Executive Assistant",
              "id": "jobFunction"
            },
            {
              "value": "finance analyst",
              "label": "Finance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "finance business analyst",
              "label": "Finance Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "finance business partner",
              "label": "Finance Business Partner",
              "id": "jobFunction"
            },
            {
              "value": "finance controller",
              "label": "Finance Controller",
              "id": "jobFunction"
            },
            {
              "value": "finance director",
              "label": "Finance Director",
              "id": "jobFunction"
            },
            {
              "value": "finance manager",
              "label": "Finance Manager",
              "id": "jobFunction"
            },
            {
              "value": "finance officer",
              "label": "Finance Officer",
              "id": "jobFunction"
            },
            {
              "value": "finance operations manager",
              "label": "Finance Operations Manager",
              "id": "jobFunction"
            },
            {
              "value": "finance project manager",
              "label": "Finance Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "financial accountant",
              "label": "Financial Accountant",
              "id": "jobFunction"
            },
            {
              "value": "financial advisor",
              "label": "Financial Advisor",
              "id": "jobFunction"
            },
            {
              "value": "financial analyst",
              "label": "Financial Analyst",
              "id": "jobFunction"
            },
            {
              "value": "financial control accountant",
              "label": "Financial Control Accountant",
              "id": "jobFunction"
            },
            {
              "value": "financial controller",
              "label": "Financial Controller",
              "id": "jobFunction"
            },
            {
              "value": "financial crime manager",
              "label": "Financial Crime Manager",
              "id": "jobFunction"
            },
            {
              "value": "financial data analyst",
              "label": "Financial Data Analyst",
              "id": "jobFunction"
            },
            {
              "value": "financial engineer",
              "label": "Financial Engineer",
              "id": "jobFunction"
            },
            {
              "value": "financial planner",
              "label": "Financial Planner",
              "id": "jobFunction"
            },
            {
              "value": "financial planning and analysis",
              "label": "Financial Planning and Analysis",
              "id": "jobFunction"
            },
            {
              "value": "financial reporting analyst",
              "label": "Financial Reporting Analyst",
              "id": "jobFunction"
            },
            {
              "value": "financial reporting manager",
              "label": "Financial Reporting Manager",
              "id": "jobFunction"
            },
            {
              "value": "fixed income analyst",
              "label": "Fixed Income Analyst",
              "id": "jobFunction"
            },
            {
              "value": "fixed income portfolio manager",
              "label": "Fixed Income Portfolio Manager",
              "id": "jobFunction"
            },
            {
              "value": "fixed income research analyst",
              "label": "Fixed Income Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "fixed income sales",
              "label": "Fixed Income Sales",
              "id": "jobFunction"
            },
            {
              "value": "fp&a analyst",
              "label": "FP&A Analyst",
              "id": "jobFunction"
            },
            {
              "value": "front office business analyst",
              "label": "Front Office Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "front office developer",
              "label": "Front Office Developer",
              "id": "jobFunction"
            },
            {
              "value": "fund accountant",
              "label": "Fund Accountant",
              "id": "jobFunction"
            },
            {
              "value": "fund accounting manager",
              "label": "Fund Accounting Manager",
              "id": "jobFunction"
            },
            {
              "value": "fund administrator",
              "label": "Fund Administrator",
              "id": "jobFunction"
            },
            {
              "value": "fund analyst",
              "label": "Fund Analyst",
              "id": "jobFunction"
            },
            {
              "value": "fund controller",
              "label": "Fund Controller",
              "id": "jobFunction"
            },
            {
              "value": "fund manager",
              "label": "Fund Manager",
              "id": "jobFunction"
            },
            {
              "value": "fx sales",
              "label": "FX Sales",
              "id": "jobFunction"
            },
            {
              "value": "general manager",
              "label": "General Manager",
              "id": "jobFunction"
            },
            {
              "value": "group accountant",
              "label": "Group Accountant",
              "id": "jobFunction"
            },
            {
              "value": "group financial accountant",
              "label": "Group Financial Accountant",
              "id": "jobFunction"
            },
            {
              "value": "group financial controller",
              "label": "Group Financial Controller",
              "id": "jobFunction"
            },
            {
              "value": "head of audit",
              "label": "Head of Audit",
              "id": "jobFunction"
            },
            {
              "value": "head of business development",
              "label": "Head of Business Development",
              "id": "jobFunction"
            },
            {
              "value": "head of compliance",
              "label": "Head of Compliance",
              "id": "jobFunction"
            },
            {
              "value": "head of credit",
              "label": "Head of Credit",
              "id": "jobFunction"
            },
            {
              "value": "head of finance",
              "label": "Head of Finance",
              "id": "jobFunction"
            },
            {
              "value": "head of fp&a",
              "label": "Head of FP&A",
              "id": "jobFunction"
            },
            {
              "value": "head of internal audit",
              "label": "Head of Internal Audit",
              "id": "jobFunction"
            },
            {
              "value": "head of marketing",
              "label": "Head of Marketing",
              "id": "jobFunction"
            },
            {
              "value": "head of operational risk",
              "label": "Head of Operational Risk",
              "id": "jobFunction"
            },
            {
              "value": "head of operations",
              "label": "Head of Operations",
              "id": "jobFunction"
            },
            {
              "value": "head of risk management",
              "label": "Head of Risk Management",
              "id": "jobFunction"
            },
            {
              "value": "head of risk",
              "label": "Head of Risk",
              "id": "jobFunction"
            },
            {
              "value": "head of sales",
              "label": "Head Of Sales",
              "id": "jobFunction"
            },
            {
              "value": "hedge fund accountant",
              "label": "Hedge Fund Accountant",
              "id": "jobFunction"
            },
            {
              "value": "hedge fund analyst",
              "label": "Hedge Fund Analyst",
              "id": "jobFunction"
            },
            {
              "value": "hedge fund operations analyst",
              "label": "Hedge Fund Operations Analyst",
              "id": "jobFunction"
            },
            {
              "value": "hedge fund operations associate",
              "label": "Hedge Fund Operations Associate",
              "id": "jobFunction"
            },
            {
              "value": "hr assistant",
              "label": "HR Assistant",
              "id": "jobFunction"
            },
            {
              "value": "hr business partner",
              "label": "HR Business Partner",
              "id": "jobFunction"
            },
            {
              "value": "hr manager",
              "label": "HR Manager",
              "id": "jobFunction"
            },
            {
              "value": "implementation consultant",
              "label": "Implementation Consultant",
              "id": "jobFunction"
            },
            {
              "value": "implementation manager",
              "label": "Implementation Manager",
              "id": "jobFunction"
            },
            {
              "value": "information security officer",
              "label": "Information Security Officer",
              "id": "jobFunction"
            },
            {
              "value": "institutional sales manager",
              "label": "Institutional Sales Manager",
              "id": "jobFunction"
            },
            {
              "value": "institutional sales",
              "label": "Institutional Sales",
              "id": "jobFunction"
            },
            {
              "value": "intern",
              "label": "Intern",
              "id": "jobFunction"
            },
            {
              "value": "internal audit manager",
              "label": "Internal Audit Manager",
              "id": "jobFunction"
            },
            {
              "value": "internal audit",
              "label": "Internal Audit",
              "id": "jobFunction"
            },
            {
              "value": "internal auditor",
              "label": "Internal Auditor",
              "id": "jobFunction"
            },
            {
              "value": "internal wholesaler",
              "label": "Internal Wholesaler",
              "id": "jobFunction"
            },
            {
              "value": "investment accountant",
              "label": "Investment Accountant",
              "id": "jobFunction"
            },
            {
              "value": "investment advisor",
              "label": "Investment Advisor",
              "id": "jobFunction"
            },
            {
              "value": "investment analyst",
              "label": "Investment Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investment associate",
              "label": "Investment Associate",
              "id": "jobFunction"
            },
            {
              "value": "investment banking analyst",
              "label": "Investment Banking Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investment banking associate",
              "label": "Investment Banking Associate",
              "id": "jobFunction"
            },
            {
              "value": "investment communications manager",
              "label": "Investment Communications Manager",
              "id": "jobFunction"
            },
            {
              "value": "investment consultant",
              "label": "Investment Consultant",
              "id": "jobFunction"
            },
            {
              "value": "investment director",
              "label": "Investment Director",
              "id": "jobFunction"
            },
            {
              "value": "investment executive",
              "label": "Investment Executive",
              "id": "jobFunction"
            },
            {
              "value": "investment manager",
              "label": "Investment Manager",
              "id": "jobFunction"
            },
            {
              "value": "investment operations analyst",
              "label": "Investment Operations Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investment operations manager",
              "label": "Investment Operations Manager",
              "id": "jobFunction"
            },
            {
              "value": "investment research analyst",
              "label": "Investment Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investment risk analyst",
              "label": "Investment Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investment risk manager",
              "label": "Investment Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "investment specialist",
              "label": "Investment Specialist",
              "id": "jobFunction"
            },
            {
              "value": "investment writer",
              "label": "Investment Writer",
              "id": "jobFunction"
            },
            {
              "value": "investor relations analyst",
              "label": "Investor Relations Analyst",
              "id": "jobFunction"
            },
            {
              "value": "investor relations associate",
              "label": "Investor Relations Associate",
              "id": "jobFunction"
            },
            {
              "value": "investor relations",
              "label": "Investor Relations",
              "id": "jobFunction"
            },
            {
              "value": "it audit manager",
              "label": "IT Audit Manager",
              "id": "jobFunction"
            },
            {
              "value": "it auditor",
              "label": "IT Auditor",
              "id": "jobFunction"
            },
            {
              "value": "it business analyst",
              "label": "IT Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "it manager",
              "label": "IT Manager",
              "id": "jobFunction"
            },
            {
              "value": "it project manager",
              "label": "IT Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "it risk manager",
              "label": "IT Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "java developer",
              "label": "Java Developer",
              "id": "jobFunction"
            },
            {
              "value": "junior accountant",
              "label": "Junior Accountant",
              "id": "jobFunction"
            },
            {
              "value": "junior analyst",
              "label": "Junior Analyst",
              "id": "jobFunction"
            },
            {
              "value": "junior business analyst",
              "label": "Junior Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "junior compliance officer",
              "label": "Junior Compliance Officer",
              "id": "jobFunction"
            },
            {
              "value": "junior investment analyst",
              "label": "Junior Investment Analyst",
              "id": "jobFunction"
            },
            {
              "value": "junior portfolio manager",
              "label": "Junior Portfolio Manager",
              "id": "jobFunction"
            },
            {
              "value": "junior trader",
              "label": "Junior Trader",
              "id": "jobFunction"
            },
            {
              "value": "key account manager",
              "label": "Key Account Manager",
              "id": "jobFunction"
            },
            {
              "value": "kyc analyst",
              "label": "KYC Analyst",
              "id": "jobFunction"
            },
            {
              "value": "kyc manager",
              "label": "KYC Manager",
              "id": "jobFunction"
            },
            {
              "value": "kyc specialist",
              "label": "KYC Specialist",
              "id": "jobFunction"
            },
            {
              "value": "lead business analyst",
              "label": "Lead Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "legal and compliance manager",
              "label": "Legal and Compliance Manager",
              "id": "jobFunction"
            },
            {
              "value": "legal counsel",
              "label": "Legal Counsel",
              "id": "jobFunction"
            },
            {
              "value": "legal entity controller",
              "label": "Legal Entity Controller",
              "id": "jobFunction"
            },
            {
              "value": "liquidity analyst",
              "label": "Liquidity Analyst",
              "id": "jobFunction"
            },
            {
              "value": "liquidity reporting",
              "label": "Liquidity Reporting",
              "id": "jobFunction"
            },
            {
              "value": "liquidity risk manager",
              "label": "Liquidity Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "m&a analyst",
              "label": "M&A Analyst",
              "id": "jobFunction"
            },
            {
              "value": "m&a associate",
              "label": "M&A Associate",
              "id": "jobFunction"
            },
            {
              "value": "management accountant",
              "label": "Management Accountant",
              "id": "jobFunction"
            },
            {
              "value": "management consultant",
              "label": "Management Consultant",
              "id": "jobFunction"
            },
            {
              "value": "managing director",
              "label": "Managing Director",
              "id": "jobFunction"
            },
            {
              "value": "market risk analyst",
              "label": "Market Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "market risk business analyst",
              "label": "Market Risk Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "market risk manager",
              "label": "Market Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "marketing analyst",
              "label": "Marketing Analyst",
              "id": "jobFunction"
            },
            {
              "value": "marketing assistant",
              "label": "Marketing Assistant",
              "id": "jobFunction"
            },
            {
              "value": "marketing associate",
              "label": "Marketing Associate",
              "id": "jobFunction"
            },
            {
              "value": "marketing director",
              "label": "Marketing Director",
              "id": "jobFunction"
            },
            {
              "value": "marketing executive",
              "label": "Marketing Executive",
              "id": "jobFunction"
            },
            {
              "value": "marketing manager",
              "label": "Marketing Manager",
              "id": "jobFunction"
            },
            {
              "value": "mi analyst",
              "label": "MI Analyst",
              "id": "jobFunction"
            },
            {
              "value": "middle office analyst",
              "label": "Middle Office Analyst",
              "id": "jobFunction"
            },
            {
              "value": "middle office associate",
              "label": "Middle Office Associate",
              "id": "jobFunction"
            },
            {
              "value": "network engineer",
              "label": "Network Engineer",
              "id": "jobFunction"
            },
            {
              "value": "newly qualified accountant",
              "label": "Newly Qualified Accountant",
              "id": "jobFunction"
            },
            {
              "value": "office manager",
              "label": "Office Manager",
              "id": "jobFunction"
            },
            {
              "value": "operational risk analyst",
              "label": "Operational Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "operational risk manager",
              "label": "Operational Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "operational risk officer",
              "label": "Operational Risk Officer",
              "id": "jobFunction"
            },
            {
              "value": "operational risk specialist",
              "label": "Operational Risk Specialist",
              "id": "jobFunction"
            },
            {
              "value": "operational risk",
              "label": "Operational Risk",
              "id": "jobFunction"
            },
            {
              "value": "operations analyst",
              "label": "Operations Analyst",
              "id": "jobFunction"
            },
            {
              "value": "operations associate",
              "label": "Operations Associate",
              "id": "jobFunction"
            },
            {
              "value": "operations manager",
              "label": "Operations Manager",
              "id": "jobFunction"
            },
            {
              "value": "operations officer",
              "label": "Operations Officer",
              "id": "jobFunction"
            },
            {
              "value": "operations specialist",
              "label": "Operations Specialist",
              "id": "jobFunction"
            },
            {
              "value": "paralegal",
              "label": "Paralegal",
              "id": "jobFunction"
            },
            {
              "value": "paraplanner",
              "label": "Paraplanner",
              "id": "jobFunction"
            },
            {
              "value": "performance analyst",
              "label": "Performance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "personal assistant",
              "label": "Personal Assistant",
              "id": "jobFunction"
            },
            {
              "value": "pmo analyst",
              "label": "PMO Analyst",
              "id": "jobFunction"
            },
            {
              "value": "pmo manager",
              "label": "PMO Manager",
              "id": "jobFunction"
            },
            {
              "value": "portfolio administrator",
              "label": "Portfolio Administrator",
              "id": "jobFunction"
            },
            {
              "value": "portfolio analyst",
              "label": "Portfolio Analyst",
              "id": "jobFunction"
            },
            {
              "value": "portfolio associate",
              "label": "Portfolio Associate",
              "id": "jobFunction"
            },
            {
              "value": "portfolio manager",
              "label": "Portfolio Manager",
              "id": "jobFunction"
            },
            {
              "value": "portfolio specialist",
              "label": "Portfolio Specialist",
              "id": "jobFunction"
            },
            {
              "value": "pricing manager",
              "label": "Pricing Manager",
              "id": "jobFunction"
            },
            {
              "value": "private banker",
              "label": "Private Banker",
              "id": "jobFunction"
            },
            {
              "value": "private equity analyst",
              "label": "Private Equity Analyst",
              "id": "jobFunction"
            },
            {
              "value": "private equity associate",
              "label": "Private Equity Associate",
              "id": "jobFunction"
            },
            {
              "value": "private equity fund accountant",
              "label": "Private Equity Fund Accountant",
              "id": "jobFunction"
            },
            {
              "value": "product analyst",
              "label": "Product Analyst",
              "id": "jobFunction"
            },
            {
              "value": "product control analyst",
              "label": "Product control Analyst",
              "id": "jobFunction"
            },
            {
              "value": "product control",
              "label": "Product Control",
              "id": "jobFunction"
            },
            {
              "value": "product controller",
              "label": "Product Controller",
              "id": "jobFunction"
            },
            {
              "value": "product developer",
              "label": "Product Developer",
              "id": "jobFunction"
            },
            {
              "value": "product development associate",
              "label": "Product Development Associate",
              "id": "jobFunction"
            },
            {
              "value": "product development manager",
              "label": "Product Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "product manager",
              "label": "Product Manager",
              "id": "jobFunction"
            },
            {
              "value": "product specialist",
              "label": "Product Specialist",
              "id": "jobFunction"
            },
            {
              "value": "program manager",
              "label": "Program Manager",
              "id": "jobFunction"
            },
            {
              "value": "programme manager",
              "label": "Programme Manager",
              "id": "jobFunction"
            },
            {
              "value": "project accountant",
              "label": "Project Accountant",
              "id": "jobFunction"
            },
            {
              "value": "project analyst",
              "label": "Project Analyst",
              "id": "jobFunction"
            },
            {
              "value": "project coordinator",
              "label": "Project Coordinator",
              "id": "jobFunction"
            },
            {
              "value": "project management officer",
              "label": "Project Management Officer",
              "id": "jobFunction"
            },
            {
              "value": "project manager",
              "label": "Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "python developer",
              "label": "Python Developer",
              "id": "jobFunction"
            },
            {
              "value": "qa analyst",
              "label": "QA Analyst",
              "id": "jobFunction"
            },
            {
              "value": "quality assurance engineer",
              "label": "Quality Assurance Engineer",
              "id": "jobFunction"
            },
            {
              "value": "quality assurance manager",
              "label": "Quality Assurance Manager",
              "id": "jobFunction"
            },
            {
              "value": "quant analyst",
              "label": "Quant Analyst",
              "id": "jobFunction"
            },
            {
              "value": "quant developer",
              "label": "Quant Developer",
              "id": "jobFunction"
            },
            {
              "value": "quantitative analyst",
              "label": "Quantitative Analyst",
              "id": "jobFunction"
            },
            {
              "value": "quantitative developer",
              "label": "Quantitative Developer",
              "id": "jobFunction"
            },
            {
              "value": "quantitative research analyst",
              "label": "Quantitative Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "quantitative researcher",
              "label": "Quantitative Researcher",
              "id": "jobFunction"
            },
            {
              "value": "quantitative risk analyst",
              "label": "Quantitative Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "quantitative risk manager",
              "label": "Quantitative Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "quantitative trader",
              "label": "Quantitative Trader",
              "id": "jobFunction"
            },
            {
              "value": "real estate analyst",
              "label": "Real Estate Analyst",
              "id": "jobFunction"
            },
            {
              "value": "real estate investment analyst",
              "label": "Real Estate Investment Analyst",
              "id": "jobFunction"
            },
            {
              "value": "receptionist",
              "label": "Receptionist",
              "id": "jobFunction"
            },
            {
              "value": "recruiter",
              "label": "Recruiter",
              "id": "jobFunction"
            },
            {
              "value": "recruitment consultant",
              "label": "Recruitment Consultant",
              "id": "jobFunction"
            },
            {
              "value": "regional tax manager",
              "label": "Regional Tax Manager",
              "id": "jobFunction"
            },
            {
              "value": "regulatory accountant",
              "label": "Regulatory Accountant",
              "id": "jobFunction"
            },
            {
              "value": "regulatory business analyst",
              "label": "Regulatory Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "regulatory compliance manager",
              "label": "Regulatory Compliance Manager",
              "id": "jobFunction"
            },
            {
              "value": "regulatory project manager",
              "label": "Regulatory Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "regulatory reporting accountant",
              "label": "Regulatory Reporting Accountant",
              "id": "jobFunction"
            },
            {
              "value": "regulatory reporting analyst",
              "label": "Regulatory Reporting Analyst",
              "id": "jobFunction"
            },
            {
              "value": "regulatory reporting business analyst",
              "label": "Regulatory Reporting Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "regulatory reporting specialist",
              "label": "Regulatory Reporting Specialist",
              "id": "jobFunction"
            },
            {
              "value": "regulatory reporting",
              "label": "Regulatory Reporting",
              "id": "jobFunction"
            },
            {
              "value": "relationship director",
              "label": "Relationship Director",
              "id": "jobFunction"
            },
            {
              "value": "relationship manager",
              "label": "Relationship Manager",
              "id": "jobFunction"
            },
            {
              "value": "release manager",
              "label": "Release Manager",
              "id": "jobFunction"
            },
            {
              "value": "reporting analyst",
              "label": "Reporting Analyst",
              "id": "jobFunction"
            },
            {
              "value": "reporting manager",
              "label": "Reporting Manager",
              "id": "jobFunction"
            },
            {
              "value": "research analyst",
              "label": "Research Analyst",
              "id": "jobFunction"
            },
            {
              "value": "research associate",
              "label": "Research Associate",
              "id": "jobFunction"
            },
            {
              "value": "research manager",
              "label": "Research Manager",
              "id": "jobFunction"
            },
            {
              "value": "rfp manager",
              "label": "RFP Manager",
              "id": "jobFunction"
            },
            {
              "value": "rfp specialist",
              "label": "RFP Specialist",
              "id": "jobFunction"
            },
            {
              "value": "rfp writer",
              "label": "RFP Writer",
              "id": "jobFunction"
            },
            {
              "value": "risk analyst",
              "label": "Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "risk and compliance manager",
              "label": "Risk and Compliance Manager",
              "id": "jobFunction"
            },
            {
              "value": "risk and control manager",
              "label": "Risk and Control Manager",
              "id": "jobFunction"
            },
            {
              "value": "risk consultant",
              "label": "Risk Consultant",
              "id": "jobFunction"
            },
            {
              "value": "risk manager",
              "label": "Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "risk project manager",
              "label": "Risk Project Manager",
              "id": "jobFunction"
            },
            {
              "value": "risk reporting analyst",
              "label": "Risk Reporting Analyst",
              "id": "jobFunction"
            },
            {
              "value": "sales assistant",
              "label": "Sales Assistant",
              "id": "jobFunction"
            },
            {
              "value": "sales associate",
              "label": "Sales Associate",
              "id": "jobFunction"
            },
            {
              "value": "sales director",
              "label": "Sales Director",
              "id": "jobFunction"
            },
            {
              "value": "sales executive",
              "label": "Sales Executive",
              "id": "jobFunction"
            },
            {
              "value": "sales manager",
              "label": "Sales Manager",
              "id": "jobFunction"
            },
            {
              "value": "sales support associate",
              "label": "Sales Support Associate",
              "id": "jobFunction"
            },
            {
              "value": "sales support executive",
              "label": "Sales Support Executive",
              "id": "jobFunction"
            },
            {
              "value": "sales support",
              "label": "Sales Support",
              "id": "jobFunction"
            },
            {
              "value": "sales trader",
              "label": "Sales Trader",
              "id": "jobFunction"
            },
            {
              "value": "scrum master",
              "label": "Scrum Master",
              "id": "jobFunction"
            },
            {
              "value": "senior account manager",
              "label": "Senior Account Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior accountant",
              "label": "Senior Accountant",
              "id": "jobFunction"
            },
            {
              "value": "senior analyst",
              "label": "Senior Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior associate",
              "label": "Senior Associate",
              "id": "jobFunction"
            },
            {
              "value": "senior audit manager",
              "label": "Senior Audit Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior auditor",
              "label": "Senior Auditor",
              "id": "jobFunction"
            },
            {
              "value": "senior business analyst",
              "label": "Senior Business Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior business development manager",
              "label": "Senior Business Development Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior change manager",
              "label": "Senior Change Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior communications manager",
              "label": "Senior Communications Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior compliance analyst",
              "label": "Senior Compliance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior compliance manager",
              "label": "Senior Compliance Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior compliance officer",
              "label": "Senior Compliance Officer",
              "id": "jobFunction"
            },
            {
              "value": "senior consultant",
              "label": "Senior Consultant",
              "id": "jobFunction"
            },
            {
              "value": "senior credit analyst",
              "label": "Senior Credit Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior credit manager",
              "label": "Senior Credit Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior credit risk analyst",
              "label": "Senior Credit Risk Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior credit risk manager",
              "label": "Senior Credit Risk Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior data analyst",
              "label": "Senior Data Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior equity analyst",
              "label": "Senior Equity Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior finance analyst",
              "label": "Senior Finance Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior finance business partner",
              "label": "Senior Finance Business Partner",
              "id": "jobFunction"
            },
            {
              "value": "senior finance manager",
              "label": "Senior Finance Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior financial accountant",
              "label": "Senior Financial Accountant",
              "id": "jobFunction"
            },
            {
              "value": "senior financial analyst",
              "label": "Senior Financial Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior fund accountant",
              "label": "Senior Fund Accountant",
              "id": "jobFunction"
            },
            {
              "value": "senior internal audit manager",
              "label": "Senior Internal Audit Manager",
              "id": "jobFunction"
            },
            {
              "value": "senior internal auditor",
              "label": "Senior Internal Auditor",
              "id": "jobFunction"
            },
            {
              "value": "senior investment analyst",
              "label": "Senior Investment Analyst",
              "id": "jobFunction"
            },
            {
              "value": "senior investment strategist",
              "label": "Senior Investment Strategist",
              "id": "jobFunction"
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.jobTitle',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        optional: true,  //delete
      }
    },
    {
      fieldName: 'profile.professionalQualifications',
      fieldSchema: {
        type: [String],
        control: "checkboxgroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: qualificationsGroup,
        autoform: {
          options: [
            {
              label: 'CFA',
              value: 'cfa'
            },
            {
              label: 'CAIA',
              value: 'caia'
            },
            {
              label: 'CISI',
              value: 'cisi'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.yearStarted',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        optional: true,  //delete
        autoform: {
          options: years
        },
      }
    },
    {
      fieldName: 'profile.maritalStatus',
      fieldSchema: {
        type: String,
        control: "radiogroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: [
            {
              label: 'Single',
              value: 'single'
            },
            {
              label: 'Married',
              value: 'married'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.children',
      fieldSchema: {
        type: String,
        control: "radiogroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: [
            {
              label: 'No',
              value: 'no'
            },
            {
              label: 'Yes',
              value: 'yes'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.pets',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        optional: true, //delete
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Dogs',
              value: 'dogs'
            },
            {
              label: 'Cats',
              value: 'cats'
            },
            {
              label: 'Small furry',
              value: 'small-furry'
            },
            {
              label: 'Horse',
              value: 'horse'
            },
            {
              label: 'Feathered',
              value: 'feathered'
            },
            {
              label: 'Aquatic',
              value: 'aquatic'
            },
            {
              label: 'Reptile',
              value: 'reptila'
            },
            {
              label: 'Other',
              value: 'other'
            },
            {
              label: 'None',
              value: 'none'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.languages',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: languagesOptions()
        }
      }
    },
    {
      fieldName: 'profile.hobbies',
      fieldSchema: {
        type: String,
        control: "text",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favMovie',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favBook',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favMusician',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'cityhive.privacyVisibility',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        autoform: {
          options: [
            {
              label: 'Show full profile',
              value: 'show-full-profile'
            },
            {
              label: 'Show full profile only to those I’m following',
              value: 'show-full-profile-only-to-following'
            },
          ]
        },
      }
    },
    {
      fieldName: 'cityhive.privacyNotifications',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        autoform: {
          options: [
            {
              label: 'Do not email me',
              value: 'none'
            },
            {
              label: 'Send Notifications',
              value: 'send-notifications'
            },
          ]
        },
      }
    },
  ]

);

PublicationUtils.addToFields(Users.publishedFields.list, [
  'status',
  'profile.cv',
  'profile.image',
  'profile.firstName',
  'profile.lastName',
  'profile.personalEmail',
  'profile.profession',
  'profile.jobTitle',
  'profile.yearStarted',
  'profile.mobileNumber',
  'profile.education',
  'profile.department',
  'profile.professionalQualifications',
  'profile.languages',
]);

function languagesOptions() {
  const array = [
    'English',
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Basque',
    'Bengali',
    'Bulgarian',
    'Catalan',
    'Cambodian',
    'Chinese (Mandarin)',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Estonian',
    'Fiji',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Quechua',
    'Romanian',
    'Russian',
    'Samoan',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tonga',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Other',
  ];

  let elements = [];

  elements.push({
    label: '--- please choose ---',
    value: ''
  });

  array.forEach((language) => {
    let slug = language.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
      ;
    elements.push({
      label: language,
      value: slug
    });
  });

  return elements;
}

function countriesOptions() {
  const array = [
    'UNITED KINGDOM',
    'AFGHANISTAN',
    'ÅLAND ISLANDS',
    'ALBANIA',
    'ALGERIA',
    'AMERICAN SAMOA',
    'ANDORRA',
    'ANGOLA',
    'ANGUILLA',
    'ANTARCTICA',
    'ANTIGUA AND BARBUDA',
    'ARGENTINA',
    'ARMENIA',
    'ARUBA',
    'AUSTRALIA',
    'AUSTRIA',
    'AZERBAIJAN',
    'BAHAMAS',
    'BAHRAIN',
    'BANGLADESH',
    'BARBADOS',
    'BELARUS',
    'BELGIUM',
    'BELIZE',
    'BENIN',
    'BERMUDA',
    'BHUTAN',
    'BOLIVIA, PLURINATIONAL STATE OF',
    'BONAIRE, SINT EUSTATIUS AND SABA',
    'BOSNIA AND HERZEGOVINA',
    'BOTSWANA',
    'BOUVET ISLAND',
    'BRAZIL',
    'BRITISH INDIAN OCEAN TERRITORY',
    'BRUNEI DARUSSALAM',
    'BULGARIA',
    'BURKINA FASO',
    'BURUNDI',
    'CAMBODIA',
    'CAMEROON',
    'CANADA',
    'CAPE VERDE',
    'CAYMAN ISLANDS',
    'CENTRAL AFRICAN REPUBLIC',
    'CHAD',
    'CHILE',
    'CHINA',
    'CHRISTMAS ISLAND',
    'COCOS (KEELING) ISLANDS',
    'COLOMBIA',
    'COMOROS',
    'CONGO',
    'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
    'COOK ISLANDS',
    'COSTA RICA',
    'CÔTE D\'IVOIRE',
    'CROATIA',
    'CUBA',
    'CURAÇAO',
    'CYPRUS',
    'CZECH REPUBLIC',
    'DENMARK',
    'DJIBOUTI',
    'DOMINICA',
    'DOMINICAN REPUBLIC',
    'ECUADOR',
    'EGYPT',
    'EL SALVADOR',
    'EQUATORIAL GUINEA',
    'ERITREA',
    'ESTONIA',
    'ETHIOPIA',
    'FALKLAND ISLANDS (MALVINAS)',
    'FAROE ISLANDS',
    'FIJI',
    'FINLAND',
    'FRANCE',
    'FRENCH GUIANA',
    'FRENCH POLYNESIA',
    'FRENCH SOUTHERN TERRITORIES',
    'GABON',
    'GAMBIA',
    'GEORGIA',
    'GERMANY',
    'GHANA',
    'GIBRALTAR',
    'GREECE',
    'GREENLAND',
    'GRENADA',
    'GUADELOUPE',
    'GUAM',
    'GUATEMALA',
    'GUERNSEY',
    'GUINEA',
    'GUINEA-BISSAU',
    'GUYANA',
    'HAITI',
    'HEARD ISLAND AND MCDONALD ISLANDS',
    'HOLY SEE (VATICAN CITY STATE)',
    'HONDURAS',
    'HONG KONG',
    'HUNGARY',
    'ICELAND',
    'INDIA',
    'INDONESIA',
    'IRAN, ISLAMIC REPUBLIC OF',
    'IRAQ',
    'IRELAND',
    'ISLE OF MAN',
    'ISRAEL',
    'ITALY',
    'JAMAICA',
    'JAPAN',
    'JERSEY',
    'JORDAN',
    'KAZAKHSTAN',
    'KENYA',
    'KIRIBATI',
    'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',
    'KOREA, REPUBLIC OF',
    'KUWAIT',
    'KYRGYZSTAN',
    'LAO PEOPLE\'S DEMOCRATIC REPUBLIC',
    'LATVIA',
    'LEBANON',
    'LESOTHO',
    'LIBERIA',
    'LIBYA',
    'LIECHTENSTEIN',
    'LITHUANIA',
    'LUXEMBOURG',
    'MACAO',
    'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
    'MADAGASCAR',
    'MALAWI',
    'MALAYSIA',
    'MALDIVES',
    'MALI',
    'MALTA',
    'MARSHALL ISLANDS',
    'MARTINIQUE',
    'MAURITANIA',
    'MAURITIUS',
    'MAYOTTE',
    'MEXICO',
    'MICRONESIA, FEDERATED STATES OF',
    'MOLDOVA, REPUBLIC OF',
    'MONACO',
    'MONGOLIA',
    'MONTENEGRO',
    'MONTSERRAT',
    'MOROCCO',
    'MOZAMBIQUE',
    'MYANMAR',
    'NAMIBIA',
    'NAURU',
    'NEPAL',
    'NETHERLANDS',
    'NEW CALEDONIA',
    'NEW ZEALAND',
    'NICARAGUA',
    'NIGER',
    'NIGERIA',
    'NIUE',
    'NORFOLK ISLAND',
    'NORTHERN MARIANA ISLANDS',
    'NORWAY',
    'OMAN',
    'PAKISTAN',
    'PALAU',
    'PALESTINE, STATE OF',
    'PANAMA',
    'PAPUA NEW GUINEA',
    'PARAGUAY',
    'PERU',
    'PHILIPPINES',
    'PITCAIRN',
    'POLAND',
    'PORTUGAL',
    'PUERTO RICO',
    'QATAR',
    'RÉUNION',
    'ROMANIA',
    'RUSSIAN FEDERATION',
    'RWANDA',
    'SAINT BARTHÉLEMY',
    'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA',
    'SAINT KITTS AND NEVIS',
    'SAINT LUCIA',
    'SAINT MARTIN (FRENCH PART)',
    'SAINT PIERRE AND MIQUELON',
    'SAINT VINCENT AND THE GRENADINES',
    'SAMOA',
    'SAN MARINO',
    'SAO TOME AND PRINCIPE',
    'SAUDI ARABIA',
    'SENEGAL',
    'SERBIA',
    'SEYCHELLES',
    'SIERRA LEONE',
    'SINGAPORE',
    'SINT MAARTEN (DUTCH PART)',
    'SLOVAKIA',
    'SLOVENIA',
    'SOLOMON ISLANDS',
    'SOMALIA',
    'SOUTH AFRICA',
    'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
    'SOUTH SUDAN',
    'SPAIN',
    'SRI LANKA',
    'SUDAN',
    'SURINAME',
    'SVALBARD AND JAN MAYEN',
    'SWAZILAND',
    'SWEDEN',
    'SWITZERLAND',
    'SYRIAN ARAB REPUBLIC',
    'TAIWAN, PROVINCE OF CHINA',
    'TAJIKISTAN',
    'TANZANIA, UNITED REPUBLIC OF',
    'THAILAND',
    'TIMOR-LESTE',
    'TOGO',
    'TOKELAU',
    'TONGA',
    'TRINIDAD AND TOBAGO',
    'TUNISIA',
    'TURKEY',
    'TURKMENISTAN',
    'TURKS AND CAICOS ISLANDS',
    'TUVALU',
    'UGANDA',
    'UKRAINE',
    'UNITED ARAB EMIRATES',
    'UNITED STATES',
    'UNITED STATES MINOR OUTLYING ISLANDS',
    'URUGUAY',
    'UZBEKISTAN',
    'VANUATU',
    'VENEZUELA, BOLIVARIAN REPUBLIC OF',
    'VIETNAM',
    'VIRGIN ISLANDS, BRITISH',
    'VIRGIN ISLANDS, U.S.',
    'WALLIS AND FUTUNA',
    'WESTERN SAHARA',
    'YEMEN',
    'ZAMBIA',
    'ZIMBABWE',
  ];

  let elements = [];

  elements.push({
    label: '--- please choose ---',
    value: ''
  });

  array.forEach((country) => {
    let slug = country.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
      ;
    elements.push({
      label: country,
      value: slug
    });
  });

  return elements;
}