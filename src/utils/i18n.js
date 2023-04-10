import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// "Inline" English and Arabic translations. 
// We can localize to any language and any number of languages.
const resources = {
  en: {
    translation: {
      data_visualization: "Data Visualization",
      intro_text: "This Web map application uses open source libraries to collect, process and display IMERGE-INPE (National Institute for Space Research) calibrated data from GPM Mission and to compare it with in situ pluviometric stations operated by ANA(The National Water Agency) in Brazil. Shows 20 years(+7.500 daily) satellites precipitation measuraments from each of the +16.000 pluviometric and fluviometric points of interest in Brazil",
      satellite: "Satellite",
      intro_ana: "This application uses precipitation data provided by ANA (National Water Agency). Hydrometeorological stations are operated by partner entities or contracted by ANA, which is responsible for planning, standardizing procedures and equipment, inspection, data organization hydrometeorological surveys and their publication.",
      details_ana: "More details about ANA's Catalog and Repository can be seen at the following link",
      hydrological_network: "National Hydrometeorological Network",
      pluviometric_stations: "Pluviometric Stations",
      constellation_gpm: "Product IMERGE INPE - GPM",
      intro_sat: "This application uses precipitation data provided by the Center for Weather Forecasting and Climate Studies (CPTEC), a division of the National Institute for Space Research (INPE). The MERGE product has been generated using the Global Precipitation Measurement (GPM) Integrated Multi-satellite Retrievals for GPM (IMERG) data. More details on the technique can be found at",
      details_sat: "NASA's Global Precipitation Measurement Mission (GPM) uses satellites to measure Earth's rain and snowfall for the benefit of humanity. Launched by NASA and JAXA on February 27, 2014, the GPM is an international mission that sets the standard for measurements of precipitation in space. Using a network of satellites joined by the GPM Core Observatory, the GPM expands on the legacy of the Tropical Rainfall Measuring Mission (TRMM) by providing high-quality estimates of Earth's rain.",
      close: "Close",
      english: "English",
      french: "French",
      portuguese: "Portuguese",
      spanish: "Spanish",
      type: "Type",
      rain_data: "Get Rain Data",
      code: "Code",
      responsible: "Responsible",
      operator: "Operator",
      city: "City",
      scope: "Scope",
      river: "River",
      escale: "Escale",
      escale_init: "Escale Reg.",
      evaporimeter: "Evaporimeter",
      climatological: "Climatological",
      telemetry: "Telemetry",
      sediments: "Sediments",
      water_quality: "Water Quality",
      liquid_discharge: "Liquid Discharge",
      yes: "Yes",
      no: "No",
      city_state: "City/State",
      longitude_latitude: "Longitude/Latitude",
      longitude: "Longitude",
      latitude: "Latiude",
      country_state: "State",
      country: "Country",
      reg_fail: "Days/Months Fails",
      no_local_data: " No data from local(in situ) station",
      no_sat_data: "Type",
      precipitation: "Total Rainfall (mm)/Month",
      prec_details: "ANA Repository",
      prec_details2: "Satellites GPM",
      prec_overall: "Year's Average",
      prec_satOnly: "No in situ precipitation data!",
      prec: "Precipitation",
      daily: "Daily",
      about_imerge: "About IMERGE",
      monthly: "Monthly",
      name: "Name",
      pluviometric: "Pluviometric",
      fluviometric: "Fluviometric",
      basin_info: "Watershed Information",
      Jan: "Jan",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Apr",
      May: "May",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Aug",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Dec: "Dec",
      year: "Year",
      img: "en",
      details: "Details",
      about_app: "About this App"
    },
  },
  pt: {
    translation: {
      data_visualization: "Visualização de Dados",
      intro_text: "Este aplicativo usa bibliotecas de código aberto para coletar e exibir dados calibrados do IMERGE-INPE (Instituto Nacional de Pesquisas Espaciais) da Missão GPM e compará-los com estações pluviométricas in situ operadas pela ANA (Agência Nacional de Águas) no Brasil. Mostra medições de precipitação de satélites de 20 anos (+7.500 diários) de cada um dos +16.000 pontos de interesse pluviométricos e fluviométricos no Brasil.",
      satellite: "Satélite",
      intro_ana: "Este aplicativo utiliza-se de dados de precipitação disponibilizados pela ANA (Agência Nacional de Águas). As estações hidrometeorológicas são operadas por entidades parceiras ou contratadas pela ANA, que é a responsável pelo planejamento, normatização de procedimentos e equipamentos, fiscalização, organização dos dados hidrometeorológicos e sua publicação.",
      details_ana: "Mais detalhes sobre o Catálogo e Repositório da ANA podem ser vistos no seguinte link",
      hydrological_network: "Rede Hidrometeorológica Nacional",
      pluviometric_stations: "Estações Pluviométricas",
      constellation_gpm: "Produto IMERGE INPE - GPM",
      intro_sat: "Este aplicativo utiliza-se de dados de precipitação disponibilizado pelo Centro de Previsão de Tempo e Estudos Climáticos (CPTEC), uma divisão do Instituto Nacional de Pesquisas Espaciais (INPE). O produto MERGE vem sendo gerado utilizando os dados do Global Precipitation Measurement (GPM) Integrated Multi-satellitE Retrievals for GPM (IMERG). Mais detalhes sobre a técnica podem ser encontrados em",
      details_sat: "A Missão Global de Medição de Precipitação (GPM) da NASA usa satélites para medir a chuva e a queda de neve da Terra para o benefício da humanidade. Lançado pela NASA e JAXA em 27 de fevereiro de 2014, o GPM é uma missão internacional que define o padrão para medições de precipitação no espaço. Usando uma rede de satélites unidos pelo GPM Core Observatory.",
      close: "Fechar",
      english: "Inglês",
      french: "Francês",
      portuguese: "Português",
      spanish: "Espanhol",
      type: "Tipo",
      rain_data: "Obter Dados de Chuva",
      code: "Código",
      responsible: "Responsável",
      operator: "Operador",
      city: "Município",
      scope: "Trecho",
      river: "Rio",
      escale: "Escala",
      escale_init: "Escala Ini.",
      evaporimeter: "Evaporimetro",
      climatological: "Climatologica",
      telemetry: "Telemetria",
      sediments: "Sedimentos",
      water_quality: "Qual. da Água",
      liquid_discharge: "Decarga Liqui.",
      yes: "Sim",
      no: "Não",
      city_state: "Município/Estadoe",
      longitude_latitude: "Longitude/Latitude",
      longitude: "Longitude",
      latitude: "Latiude",
      country_state: "Estado",
      country: "País",
      reg_fail: "Dias/Meses Falhas",
      no_local_data: " Sem dados estação local(in situ)",
      no_sat_data: "Sem dados de satélite",
      precipitation: "Precipitação Total (mm)/mês",
      prec_details: "Repositório ANA",
      prec_details2: "Satélites GPM",
      prec_overall: "Média dos Anos",
      prec_satOnly: "Sem dados de precipitação in situ!",
      prec: "Precipitação",
      daily: "Diário",
      about_imerge: "Sobre IMERGE",
      monthly: "Mensal",
      name: "Nome",
      pluviometric: "Pluviométrica",
      fluviometric: "Fluviométrica",
      basin_info: "Informações da Bacia",
      Jan: "Jan",
      Feb: "Fev",
      Mar: "Mar",
      Apr: "Abr",
      May: "Mai",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Ago",
      Sep: "Set",
      Oct: "Out",
      Nov: "Nov",
      Dec: "Dez",
      year: "Ano",
      img: "pt",
      details: "Detalhes",
      about_app: "Sobre este App"
    },
  },
  fr: {
    translation: {
      data_visualization: "Visualisation de données",
      intro_text: "Cette application utilise des bibliothèques open source pour collecter et afficher les données calibrées IMERGE-INPE (Institut national de recherche spatiale) de la mission GPM et pour les comparer avec stations pluviométriques in situ exploitées par l'ANA (Agence nationale de l'eau) au Brésil. Affiche les mesures de précipitations satellites sur 20 ans (+7.500 par jour) de chacun des +16.000 points d'intérêt pluviométriques et fluviométriques au Brésil",
      satellite: "Satellite",
      intro_ana: "Cette application utilise les données de précipitations fournies par l'ANA (Agence nationale de l'eau). Les stations hydrométéorologiques sont exploitées par des entités partenaires ou contractées par l'ANA, qui est responsable de la planification, de la normalisation des procédures et des équipements, de l'inspection, de l'organisation des données des levés hydrométéorologiques et de leur publication.",
      details_ana: "Plus de détails sur le catalogue et le référentiel ANA peuvent être consultés sur le lien suivant",
      hydrological_network: "Réseau hydrométéorologique national",
      pluviometric_stations: "Stations Pluviométriques",
      constellation_gpm: "Produit IMERGE INPE - GPM",
      intro_sat: "Cette application utilise les données de précipitations fournies par le Centre de Prévision Météorologique et d'Etudes Climatiques (CPTEC), une division de l'Institut National de Recherche Spatiale (INPE). Le produit MERGE a été généré à l'aide des données GPM (Global Precipitation Measurement) Integrated Multi-satellite Retrievals for GPM (IMERG). Plus de détails sur la technique peuvent être trouvés à",
      details_sat: "La mission mondiale de mesure des précipitations (GPM) de la NASA utilise des satellites pour mesurer la pluie et les chutes de neige de la Terre au profit de l'humanité. Lancé par la NASA et la JAXA le 27 février 2014, le GPM est une mission internationale qui établit la norme pour les mesures des précipitations dans l'espace. Utilisant un réseau de satellites rejoint par le GPM Core Observatory.",
      close: "Fermer",
      english: "Anglais",
      french: "Français",
      portuguese: "Portugais",
      spanish: "Espagnol",
      type: "Taper",
      rain_data: " Obtenir des données de pluie",
      code: "Code",
      responsible: "Responsable",
      operator: "Opérateur",
      city: "Zone municipale",
      scope: "Portée",
      river: "Rivièree",
      escale: "Registre d'échelle",
      escale_init: "Échelle ini.",
      evaporimeter: "Évaporimètre",
      climatological: "climatologique",
      telemetry: "Télémétrie",
      sediments: "Sédiments",
      water_quality: "Qualification d'Água",
      liquid_discharge: "Décharger liquide",
      yes: "Oui",
      no: "Non",
      city_state: "Zone municipale/Etat",
      longitude_latitude: "Longitude/Latitude",
      longitude: "Longitude",
      latitude: "Latiude",
      country_state: "Etat",
      country: "Pays",
      reg_fail: "Jours/Mois-Échec",
      no_local_data: " Aucune donnée de station locale (in situ)",
      no_sat_data: "Aucune donnée du satellite",
      precipitation: "Précipitations totales (mm)/mois",
      prec_details: "référentiel ANA",
      prec_details2: "Satellites GPM",
      prec_overall: "Moyenne des années",
      prec_satOnly: "Pas de données pluviométriques in situ!",
      prec: "Précipitation",
      daily: "Quotidien",
      about_imerge: "À propos d'IMERGE",
      monthly: "Mensuel",
      name: "Nom",
      pluviometric: "Pluviométrique",
      fluviometric: "Fluviométrique",
      basin_info: "Informations sur le bassin",
      Jan: "Janv",
      Feb: "Févr",
      Mar: "Mars",
      Apr: "Avr",
      May: "Mai",
      Jun: "Juin",
      Jul: "Juil",
      Aug: "Août",
      Sep: "Sept",
      Oct: "Oct",
      Nov: "Nov",
      Dec: "Déc",
      year: "An",
      img: "fr",
      details: "Détails",
      about_app: "à propos de cette App"
    },
  },
  es: {
    translation: {
      data_visualization: "Visualización de datos",
      intro_text: "Esta aplicación utiliza bibliotecas de código abierto para recopilar y mostrar datos calibrados del IMERGE-INPE (Instituto Nacional de Investigaciones Espaciales) de la Misión GPM y compararlos con estaciones pluviométricas in situ operadas por ANA (La Agencia Nacional del Agua) en Brasil. Muestra mediciones satelitales de precipitación de 20 años (+7.500 diarios) de cada uno de los +16.000 puntos de interés pluviométricos y fluviométricos en Brasil.",
      satellite: "Satélite",
      intro_ana: "Esta aplicación utiliza datos de precipitación proporcionados por ANA (Agencia Nacional del Agua). Las estaciones hidrometeorológicas son operadas por entidades colaboradoras o contratadas por la ANA, la cual se encarga de la planificación, estandarización de procedimientos y equipos, inspección, organización de los datos de los levantamientos hidrometeorológicos y su publicación.",
      details_ana: "Se pueden ver más detalles sobre el Catálogo y Repositorio de ANA en el siguiente enlace",
      hydrological_network: "Red Hidrometeorológica Nacional",
      pluviometric_stations: "Estaciones pluviométricas",
      constellation_gpm: "Producto IMERGE INPE - GPM",
      intro_sat: "Esta aplicación utiliza datos de precipitación proporcionados por el Centro de Pronóstico del Tiempo y Estudios Climáticos (CPTEC), una división del Instituto Nacional de Investigaciones Espaciales (INPE). El producto MERGE se ha generado utilizando las recuperaciones multisatélite integradas de medición de precipitación global (GPM) para datos GPM (IMERG). Más detalles sobre la técnica se pueden encontrar en",
      details_sat: "La Misión de Medición de Precipitaciones Globales (GPM) de la NASA utiliza satélites para medir la lluvia y las nevadas de la Tierra en beneficio de la humanidad. Lanzado por la NASA y JAXA el 27 de febrero de 2014, el GPM es una misión internacional que establece el estándar para las mediciones de precipitación en el espacio. Usando una red de satélites unidos por el Observatorio GPM Core.",
      close: "Cerrar",
      english: "Inglés",
      french: "Francés",
      portuguese: "Portugués",
      spanish: "Español",
      type: "Tipo",
      rain_data: "  Obtener datos de lluvia",
      code: "Código",
      responsible: "Responsable",
      operator: "Operador",
      city: " Área municipal",
      scope: "Ámbito",
      river: "Rio",
      escale: "Registro Escala",
      escale_init: "Escala ini.",
      evaporimeter: "Evaporímetro",
      climatological: "Climatológico",
      telemetry: "Telemetría",
      sediments: "Sedimentos",
      water_quality: "Calidad del agua",
      liquid_discharge: "Descarga liq.",
      yes: "Sí",
      no: "No",
      city_state: "Área municipal/Estado",
      longitude_latitude: "Longitud/Latitud",
      longitude: "Longitud",
      latitude: "Latiud",
      country_state: "Estado",
      country: "País",
      reg_fail: "Días/Meses-Error",
      no_local_data: "Sin datos de la estación local (in situ)",
      no_sat_data: "Sin datos satelitales",
      precipitation: "Precipitación total (mm)/mes",
      prec_details: "Repositorio ANA",
      prec_details2: "Satélites GPM",
      prec_overall: "Promedio de años",
      prec_satOnly: "¡No hay datos de precipitación in situ!",
      prec: "Precipitación",
      daily: "Diario",
      about_imerge: "Acerca de IMERGE",
      monthly: "Mensual",
      name: "Nombre",
      pluviometric: "fluviométrico",
      fluviometric: "Fluviométrique",
      basin_info: "Información de la cuenca",
      Jan: "Ene",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Abr",
      May: "May",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Ago",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Dez: "Dic",
      year: "Año",
      millimeters: "mm",
      img: "es",
      details: "detalles",
      about_app: "acerca de esta App"
    },
  },
};
i18next.use(initReactI18next)
.use(HttpApi)
.use(LanguageDetector)
.init({
    resources,
    supportedLngs: ["en", "es", "fr", "pt"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;