// src/screens/TermsOfServiceScreen.js
import { ScrollView, Text, View } from "react-native";
import Footer from "../components/Footer";
import styles from "../styles/TermsOfServiceStyles";

export default function TermsOfServiceScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.content}>
            Nutzungsbedingungen{"\n\n"}
            Willkommen bei [All In One Hub]! Diese Nutzungsbedingungen regeln
            Ihre Nutzung unserer App und Dienste. Bitte lesen Sie diese
            Bedingungen sorgfältig durch, bevor Sie unsere App verwenden. Durch
            die Nutzung der App stimmen Sie diesen Bedingungen zu.{"\n\n"}
            1. Allgemeine Bestimmungen{"\n"}
            1.1. Diese Nutzungsbedingungen stellen eine rechtlich bindende
            Vereinbarung zwischen Ihnen und [Unternehmen/Entwicklername] dar.
            {"\n"}
            1.2. Durch den Zugriff auf die App oder deren Nutzung stimmen Sie
            diesen Bedingungen zu.{"\n"}
            1.3. Wenn Sie mit diesen Bedingungen nicht einverstanden sind,
            dürfen Sie die App nicht nutzen.{"\n\n"}
            2. Nutzung der App{"\n"}
            2.1. Die App darf nur für persönliche und nicht-kommerzielle Zwecke
            verwendet werden.{"\n"}
            2.2. Sie dürfen keine Inhalte oder Funktionen der App kopieren,
            verändern, verbreiten oder zurückentwickeln.{"\n"}
            2.3. Es ist verboten, Sicherheitsmaßnahmen der App zu umgehen oder
            unsere Server, Netzwerke oder Daten zu manipulieren.{"\n\n"}
            3. Konto und Sicherheit{"\n"}
            3.1. Falls die App ein Benutzerkonto erfordert, sind Sie für die
            Vertraulichkeit Ihrer Zugangsdaten verantwortlich.{"\n"}
            3.2. Sie dürfen Ihr Konto nicht an Dritte übertragen oder verkaufen.
            {"\n"}
            3.3. Wir behalten uns das Recht vor, Konten, die gegen diese
            Bedingungen verstoßen, zu sperren oder zu löschen.{"\n\n"}
            4. Virtuelle Inhalte und Käufe{"\n"}
            4.1. Die App kann virtuelle Gegenstände oder In-App-Käufe enthalten.
            {"\n"}
            4.2. Alle Käufe sind endgültig und nicht erstattungsfähig, es sei
            denn, gesetzlich vorgeschrieben.{"\n"}
            4.3. Wir behalten uns das Recht vor, Preise und Inhalte jederzeit zu
            ändern.{"\n\n"}
            5. Einschränkungen und verbotene Aktivitäten{"\n"}
            5.1. Sie dürfen die App nicht für illegale oder unangemessene Zwecke
            verwenden.{"\n"}
            5.2. Jegliche Form von Betrug, Hacks oder Exploits ist verboten.
            {"\n"}
            5.3. Die Verbreitung von beleidigenden, hasserfüllten oder
            schädlichen Inhalten ist untersagt.{"\n\n"}
            6. Geistiges Eigentum{"\n"}
            6.1. Alle Inhalte, Designs und Marken in der App sind Eigentum von
            [Unternehmen/Entwicklername] oder unseren Lizenzgebern.{"\n"}
            6.2. Sie erhalten keine Rechte oder Lizenzen an diesen Inhalten,
            außer zur Nutzung der App gemäß diesen Bedingungen.{"\n\n"}
            7. Haftungsausschluss{"\n"}
            7.1. Die Nutzung der App erfolgt auf eigenes Risiko.{"\n"}
            7.2. Wir übernehmen keine Gewähr für Verfügbarkeit, Fehlerfreiheit
            oder Sicherheit der App.{"\n"}
            7.3. Wir haften nicht für direkte oder indirekte Schäden, die aus
            der Nutzung oder Nichtverfügbarkeit der App entstehen.{"\n\n"}
            8. Änderungen der Nutzungsbedingungen{"\n"}
            8.1. Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu
            ändern.{"\n"}
            8.2. Änderungen treten mit Veröffentlichung in der App in Kraft.
            {"\n"}
            8.3. Wenn Sie den neuen Bedingungen nicht zustimmen, müssen Sie die
            Nutzung der App einstellen.{"\n\n"}
            9. Datenschutz{"\n"}
            9.1. Ihre Nutzung der App unterliegt unserer
            [Datenschutzerklärung](Link zur Datenschutzerklärung einfügen).
            {"\n"}
            9.2. Wir erheben und verarbeiten personenbezogene Daten im Einklang
            mit den geltenden Datenschutzgesetzen.{"\n\n"}
            10. Kontakt{"\n"}
            Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren
            Sie uns bitte unter folgender E-Mail-Adresse:
            [support@tufancakir.com].{"\n\n"}
            Durch die Nutzung dieser App stimmen Sie diesen Nutzungsbedingungen
            zu.
          </Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
