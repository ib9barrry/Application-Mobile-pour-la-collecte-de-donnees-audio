import React from "react";
import * as Network from 'expo-network';
import * as Application from 'expo-application';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  ImageBackground,
  Picker,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

import { Audio, AVPlaybackStatus } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as Icons from "./components/Icons";

import logo1 from "./logo1.png";
import bg from './back1.jpg';
import bg2 from './back2.jpeg';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';


let NIV = 0;
let PULAAR_NIV = 0;
let WOLOF_NIV = 0;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";

// CHIFFRES EN WOLOF 
const CHIFFRES_WOLOF = [[1, "Benn"], [2, "Ñaar"], [3, "Ñett"], [4, "Ñent"], [5, "Juróom"],
[6, "Juróom-Benn"], [7, "Juróom-Ñaar"], [8, "Juróom-Ñett"], [9, "Juróom-Ñent"], [10, "Fukk"],
[11, 'Fukk-Ag-Benn'], [12, 'Fukk-Ag-Ñaar'], [13, 'Fukk-Ag-Ñett'], [14, 'Fukk-Ag-Ñent'], [15, 'Fukk-Ag-Juróom'],
[16, 'Fukk-Ag-Juróom-Benn'], [17, 'Fukk-Ag-Juróom-Ñaar'], [18, 'Fukk-Ag-Juróom-Ñett'], [19, 'Fukk-Ag-Juróom-Ñent'], [20, "Ñaar-Fukk"],
[21, "Ñaar-Fukk-Ag-Benn"], [30, "Fanweer"], [31, "Fanweer-Ag-Benn"], [33, "Fanweer-Ag-Ñett"], [40, "Ñent-Fukk"],
[50, "Juróom-Fukk"], [60, "Juróom-Benn-Fukk"], [70, "Juróom-Ñaar-Fukk"], [80, "Juróom-Ñett-Fukk"], [90, "Juróom-Ñent-Fukk"],
[99, "Juróom-Ñent-Fukk-Ag-Juróom-Ñent"], [100, "Téeméer"], [101, "Téeméer-Ag-Benn"], [138, "Téeméer-Ag-Fanweer-Ag-Juróom-Ñett"],
[200, "Ñaar-Téeméer"], [209, "Ñaar-Téeméer-Ag-Juróom-Ñent"], [230, "Ñaar-Téeméer-Ag-Fanweer"], [300, "Ñett-Téeméer"], [600, "Juróom-Ben-Téeméer"],
[600, "Juróom-Ñaar-Téeméer"], [1000, "Junni"], [1500, "Junni-Ag-Juróom-Téeméer"], [2000, "Ñaar-Junni"], [3000, "Ñett-Junni"], [5000, "Juróom-Junni"],
[9000, "Juróom-Ñent-Junni"], [10000, "Fukk-Junni"], [15000, "Fukk-Ag-Juróom-Junni"], [20000, "Ñaar-Fukk-Junni"], [30000, "Fanweer-Junni"],
[90000, "Juróom-Ñent-Fukk-Junni"], [100000, "Téeméer-Junni"], [500000, "Juróom-Téeméer-Junni"], [550000, "Juróom-Téeméer-Junni-Ag-Juróom-Fukk-Junni"], [1000000, "Alfa-Junni"], [3000000, "Ñett-Alfa-Junni"],
[30000000, "Fanweer-Alfa-Junni"], [99999999999, 'fin']

];

// CHIFFRES EN PULAAR OU POULAR OU FOULA OU EN PEULH 
const CHIFFRES_PULAAR =
  [
    [1, "Go'o"], [2, "Didi"], [3, "Tati"], [4, "Nay"], [5, "Jowi"],
    [6, "Jeego'o"], [7, "Jeedidi"], [8, "Jeetati"], [9, "Jeenay"], [10, "Sappo"],
    [11, "Sappo-è-Go'o"], [12, "Sappo-è-Didi"], [13, "Sappo-è-Tati"], [14, "Sappo-è-Nay"], [15, "Sappo-è-Jowi"],
    [20, "Noogay"], [26, "Noogay-è-Jeego'o"], [27, "Noogay-è-Jeedidi"], [28, "Noogay-è-Jeetati"], [29, "Noogay-è-Jeenay"],
    [30, "Cappande-Tati"], [31, "Cappande-Tati-è-Go'o"], [40, "Cappande-Nay"], [43, "Cappande-Nay-è-Tati"], [44, "Cappande-Nay-è-Nay"],
    [50, "Cappande-Jowi"], [56, "Cappande-Jowi-è-Jeego'o"], [57, "Cappande-Jowi-è-Jeedidi"], [60, "Cappande-Jeego'o"], [68, "Cappande-Jeego'o-è-Jeetati"],
    [69, "Cappande-Jeego'o-è-Jeenay"], [70, "Cappande-Jeedidi"], [71, "Cappane-Jeedidi-è-Go'o"], [80, "Cappande-Jeetati"], [82, "Cappande-Jeetati-è-Didi"],
    [90, "Cappande-Jeenay"], [96, "Cappande-Jeenay-è-Jeego'o"], [99, "Cappande-Jeenay-è-Jeenay"], [100, "Teemedere"], [101, "Teemedere-è-Go'o"],
    [102, "Teemedere-è-Didi"], [110, "Teemedere-è-Sappo"], [122, "Teemedere-è-Noogay-è-Didi"], [136, "Teemedere-è-Cappande-Tati-è-Jeego'o"], [178, "Teemedere-è-Cappande-Jeedidi-è-Jeetati"],
    [190, "Teemedere-è-Cappande-Jeenay"], [200, "Teemedde-Didi"], [250, "Teemedde-Didi-è-Cappande-Jowi"], [300, "Teemedde-Tati"], [310, "Teemedde-Tati-è-Sappo"],
    [400, "Teemedde-Nay"], [460, "Teemedde-Nay-è-Cappande-Jeego'o"], [500, "Teemedde-Jowi"], [590, "Teemedde-Jowi-è-Cappande-Jeenay"], [680, "Teemedde-Jeego'o-è-Cappande-Jeetati"],
    [700, "Teemedde-Jeedidi"], [725, "Teemedde-Jeedidi-è-Noogay-è-Jowi"], [800, "Teemedde-Jeetati"], [901, "Teemedde-Jeenay-è-Go'o"], [1000, "Wuluure"],
    [1300, "Wuluure-è-Teemedde-Tati"], [1500, "Wuluure-è-Teemedde-Jowi"], [2000, "Guluuji-Didi"], [3000, "Guluuji-Tati"], [10000, "Guluuji-Sappo"],
    [20000, "Guluuji-Noogay"], [50000, "Guluuji-Cappande-Jowi"], [100000, "Guluuji-Teemedere"], [200000, "Guluuji-Teemedde-Didi"], [1000000, "Miliyon"],
    [2000000, "Miliyon-Didi"], [5200000, "Miliyon-Jowi-è-Guluuji-Teemedde-Didi"], [100000000, "Miliyon-Teemedere"], [99999999999, 'fin']

  ];

// CHIFFRES EN LINGALA                    
const CHIFFRES_LINGALA = [[1, "mókó"], [2, "mibalé"], [3, "misato"], [4, "mínei"], [5, "mítáno"],
[6, "motóba"], [7, "sámbó"], [8, "mwámbe"], [9, "libwá"], [10, "zómi"],
[11, "zómi na mókó"], [12, "zómi na mibalé"], [13, "zómi na misato"], [14, "zómi na mínei"], [15, "zómi na mítáno"],
[20, "ntúkú mibalé"], [26, "ntúkú mibalé na motóba"], [27, "ntúkú mibalé na sámbó"], [28, "ntúkú mibalé na mwámbe"], [29, "ntúkú mibalé na libwá"],
[30, "ntúkú mísát"], [31, "ntúkú mísát na mókó"], [40, "ntúkú mínei"], [41, "ntúkú mínei na mókó"], [50, "ntúkú mítáno"],
[53, "ntúkú mítáno na misato"], [60, "ntúkú motóba"], [64, "ntúkú na mínei"], [70, "ntúkú sámbó"], [75, "ntúkú sámbó na mítáno"],
[80, "ntúkú mwámbe"], [86, "ntúkú mwámbe na motóba"], [90, "ntúkú libwá"], [101, "nkámá na mókó"], [107, "nkámá na sámbó"],
[118, "nkámá na zómi na mwámbe"], [139, "nkámá na ntúkú mísát na libwá"], [199, "nkámá na ntúkú libwá na libwá"], [200, "nkámá mibalé"], [250, "nkámá mibalé na ntúkú mítáno"],
[300, "nkámá misato"], [401, "nkámá mínei na mókó"], [500, "nkámá mítáno"], [646, "nkámá motóbá na ntúkú mínei na motóba"], [700, "nkámá nsambo"],
[800, "nkámá mwambe"], [950, "nkámá libwá na ntúkú mítáno"], [1000, "nkóto"], [1300, "nkóto na nkámá misato"], [2000, "nkóto mibalé"],
[2550, "nkóto mibalé na nkámá mítáno na ntúkú mítáno"], [3000, "nkóto misáto"], [4000, "nkóto mínei"], [5000, "nkóto mítáno"], [10000, "mokoko"],
[12000, "mokoko na nkoto mibalé"], [15000, "mokoko na nkoto mítáno"], [20000, "mikoko mibalé"], [30000, "mikoko misato"], [40000, "mikoko minei"],
[100000, "elundu"], [119000, "elundu na mokoko na nkoto libwa"], [150000, "elundu na mikoko mítáno"], [160000, "elundu na mikoko motóba"], [200000, "bilundu mibale"],
[300000, "bilundu misato"], [1000000, "efuku"], [6000000, "bifuku motoba"], [8000000, "bifuku mwambe"]
];


type Props = { name: string, langue: string };

type State = {
  haveRecordingPermissions: boolean;
  isLoading: boolean;
  isPlaybackAllowed: boolean;
  muted: boolean;
  soundPosition: number | null;
  soundDuration: number | null;
  recordingDuration: number | null;
  shouldPlay: boolean;
  isPlaying: boolean;
  isRecording: boolean;
  fontLoaded: boolean;
  shouldCorrectPitch: boolean;
  volume: number;
  rate: number;
  mac: string;
  lien: string;
  niveau: number;
  chiffre: number;
  nombre: string;
  merci: string;
  envoyer: string;
  len: number;
};


//------------------------------------------------------CLASSE Record --------------------------------------------------
class Record extends React.Component<Props, State> {
  private recording: Audio.Recording | null;
  private sound: Audio.Sound | null;
  private isSeeking: boolean;
  private shouldPlayAtEndOfSeek: boolean;
  private readonly recordingSettings: Audio.RecordingOptions;

  constructor(props: Props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      mac: "",
      lien: "",
      niveau: NIV,
      chiffre: 1,
      nombre: "",
      merci: "",
      len: 1,
      envoyer: "non",
    };
    this.recordingSettings = Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

    // UNCOMMENT THIS TO TEST maxFileSize:
    this.recordingSettings = {
      ...this.recordingSettings,
      android: {
        ...this.recordingSettings.android,
        maxFileSize: 12000,
        //extension: '.m4a',
        extension: '.wav',
        sampleRate: 22050,
        numberOfChannels: 2
      },
      ios: {
        //extension: '.caf',
        extension: '.caf',
        sampleRate: 22050,
        numberOfChannels: 2
      },
    };
  }

  createThreeButtonAlert1 = async () =>
    Alert.alert(
      "Quitter",
      "C'est le dernier avertissement.",
      [

        {
          text: "Quitter", onPress: () => {
            console.log("quitter .");
          }
        },
      ],
      { cancelable: false }
    );
  createThreeButtonAlert2 = async () =>
    Alert.alert(
      "Ok Vous etes le seul ",
      "Responsable.",
      [

        {
          text: "je vous avais dit de Quitter", onPress: () => {
            console.log("quitter .");
          }
        },
      ],
      { cancelable: false }
    );

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        "cutive-mono-regular": require("./assets/fonts/CutiveMono-Regular.ttf"),
      });
      this.setState({ fontLoaded: true });
      if (NIV >= 1) {
        NIV = NIV - 1;
      }
      if (this.props.langue === "WOLOF") {
        let a = CHIFFRES_WOLOF[NIV];
        this.setState({ nombre: a[1].toString(), chiffre: Number(a[0]), merci: "Jërëjëf \n", len: CHIFFRES_WOLOF.length })


      } else {
        let a = CHIFFRES_PULAAR[NIV];
        this.setState({ nombre: a[1].toString(), chiffre: Number(a[0]), merci: "Djarama fótta\n", len: CHIFFRES_PULAAR.length })
      }
    })();
    this._askForPermissions();
  }

  private _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (this.state.mac == "") {
      let mac = await Network.getMacAddressAsync();
      if (mac == "02:00:00:00:00:00") {
        mac = await Application.getIosIdForVendorAsync();
      }
      console.log(" info mac : ", mac);
      this.setState({ mac: mac })
    } else {
      console.log(" cool ")
    }


    this.setState({
      haveRecordingPermissions: response.status === "granted",

    });
    let l = "";
    fetch('https://docs.google.com/uc?export=download&id=1wkZP3LQ2WRp3FKvtKM_2JINXWOYRthBO')
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        let ll = data.split("#");
        l = ll[1];

        this.setState({
          lien: l,
        });

        console.log("data :", this.state.lien);
        //console.log("data len :", this.state.l.length);
      });
  };

  private _updateScreenForSoundStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis ?? null,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  private _updateScreenForRecordingStatus = (status: Audio.RecordingStatus) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  private async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  private async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    if (!this.recording) {
      return;
    }
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // On Android, calling stop before any data has been collected results in
      // an E_AUDIO_NODATA error. This means no audio data has been written to
      // the output file is invalid.
      if (error.code === "E_AUDIO_NODATA") {
        console.log(
          `Stop was called too quickly, no data has yet been received (${error.message})`
        );
      } else {
        console.log("STOP ERROR: ", error.code, error.name, error.message);
      }
      this.setState({
        isLoading: false,
      });
      return;
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI() || "");
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log(this.props.name)
    let formData = new FormData();
    const uri = await info['uri'];
    //let apiUrl = 'http://10.249.247.36:5000/post';
    //let apiUrl =  "http://50e171e9b2fb.ngrok.io/post_data";
    //let apiUrl = 'http://192.168.1.16:5000/post';
    //console.log("\n\n uri: ",uri);
    let apiUrl = this.state.lien;
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'langue': this.props.langue,
        'niveau': this.state.niveau.toString(),
        'chiffre': this.state.chiffre.toString(),
        'envoyer': this.state.envoyer.toString(),
        'mac': this.state.mac,

      }
    };
    console.log("options: ", "\n", options);


    Alert.alert(
      "Pour passer au Chiffre Suivant",
      "Cliquez sur le Bouton Suivant , Merci .",
      [

        {
          text: "Recommencer", onPress: () => {
            let CHIFFRES;
            if (this.props.langue === "WOLOF") {
              CHIFFRES = CHIFFRES_WOLOF;
            } else {
              CHIFFRES = CHIFFRES_PULAAR;
            }
            let a = this.state.niveau;
            let val = CHIFFRES[a];
            let chiffres = Number(val[0]);
            let nombres = val[1].toString();
            this.setState({ niveau: a, chiffre: chiffres, nombre: nombres, recordingDuration: null, envoyer: "non" })

            console.log(" Recommencer ")
          }
        },

        {
          text: "Suivant", onPress: () => {
            let CHIFFRES;
            if (this.props.langue === "WOLOF") {
              CHIFFRES = CHIFFRES_WOLOF;
            } else {
              CHIFFRES = CHIFFRES_PULAAR;
            }

            let a = this.state.niveau + 1;
            let val = CHIFFRES[a];
            let chiffres = Number(val[0]);
            let nombres = val[1].toString();
            this.setState({ niveau: a, chiffre: chiffres, nombre: nombres, recordingDuration: null, envoyer: "oui" })
            console.log(" Suivant ");
            NIV = a + 1;
            console.log(" NIV :", NIV);
            fetch(this.state.lien, options).then(res => res.json())
              .then(data => {
                console.log(" dans fetch  ");
                console.log("data: ", data.keyword);
                if (data.keyword === "arrete") {
                  this.createThreeButtonAlert1();
                } else if (data.keyword === "fin") {
                  while (true) {
                    this.createThreeButtonAlert2();
                  }
                } else {
                  console.log("Cool ");
                }
              })

          }
        },
      ],
      { cancelable: false }
    );



    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  private _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  private _getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  private _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return "";
  }

  private _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }



  render() {
    if (!this.state.fontLoaded) {
      return <View style={styles.emptyContainer} />;
    }

    if (!this.state.haveRecordingPermissions) {
      return (
        <View style={styles.container}>
          <View />
          <Text
            style={[
              styles.noPermissionsText,
              { fontFamily: "cutive-mono-regular" },
            ]}
          >
            You must enable audio recording permissions in order to use this
            app.
          </Text>
          <View />
        </View>
      );
    }
    if (this.state.chiffre === 11) {

      return (
        <View style={{ flex: 1, flexDirection: 'column', paddingTop: DEVICE_HEIGHT / 5, justifyContent: 'flex-start', alignContent: 'center', backgroundColor: "#FFE097", opacity: 0.8 }}>
          <View />
          <Text
            style={[

              {
                fontFamily: "cutive-mono-regular",
                color: 'green',
                fontSize: 40,
                textAlign: 'center',
              },
            ]}
          >
            {this.state.merci} L'afrique Vous Remercie.
          </Text>
          <View />
          <View style={{ backgroundColor: 'yellow', marginTop: DEVICE_HEIGHT / 3, borderWidth: 5, borderColor: "green", borderRadius: 16 }}>
            <Button
              title="Quitter"
              color='red'
              onPress={() => this.props.name.navigate('AFROai')}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, width: DEVICE_WIDTH, height: DEVICE_HEIGHT, flexDirection: "column", justifyContent: 'space-between', alignItems: "center", paddingBottom: DEVICE_HEIGHT / 10, paddingTop: DEVICE_HEIGHT / 20, backgroundColor: "#FFE097" }}>
        <View style={{ margin: 2, }}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', margin: 10 }}>Compter de 1 a 10 en wolof</Text>
        </View>
        <View style={{ margin: 20, }}>
          <Text style={{ textAlign: 'center', margin: 4 }}>Progression</Text>
          {/*<Progress.Bar progress={ NIV / this.state.len } width={200} height={15} />*/}
          <Progress.Bar progress={NIV / 10} width={200} height={15} />
        </View>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold", textShadowColor: "blue", textDecorationLine: "underline" }}>
            {this.state.chiffre} : {this.state.nombre}
          </Text>
        </View>
        <View style={styles.recordingDataRowContainer}>
          <Text
            style={[
              styles.recordingTimestamp,
              { fontFamily: "cutive-mono-regular", fontSize: 70, fontWeight: "bold" }
            ]}
          >
            {this._getRecordingTimestamp()}
          </Text>
          <Text
            style={[styles.liveText, { fontFamily: "cutive-mono-regular", fontSize: 28, fontWeight: 'bold', color: 'black', margin: 10, minHeight: DEVICE_HEIGHT / 3.5 }]}
          >
            {this.state.isRecording ? "Enregistrement en Cours " + "Dites " + this.state.nombre : "Cliquer sur le micro"}
          </Text>
        </View>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onRecordPressed}
          disabled={this.state.isLoading}
        >
          <Image style={[{ width: DEVICE_WIDTH / 3.5, height: DEVICE_WIDTH / 3.5 }]} source={logo1} />
        </TouchableHighlight>
      </View>
    );
  }
}

//------------------------------------------------------CLASSE Record fin--------------------------------------------------
//------------------------------------------------------CLASSE Record fin--------------------------------------------------





function WolofCollect1a10({ navigation }) {
  return (
    <ImageBackground source={bg} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <View style={{ flex: 1, margin: 0, padding: 0, justifyContent: "space-between", opacity: 0.9 }}>
        <Record name={navigation} langue='WOLOF' />
      </View>
    </ImageBackground>
  )
}

function PularCollect1a10({ navigation }) {
  return (
    <ImageBackground source={bg} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <View style={{ flex: 1, margin: 0, padding: 0, justifyContent: "space-between", opacity: 0.9 }}>
        <Record name={navigation} langue="PULAAR" />
      </View>
    </ImageBackground>
  );
}

function LingalaCollect1a10({ navigation }) {
  return (
    <ImageBackground source={bg} style={{ flex: 1, justifyContent: 'flex-start', opacity: 0.9 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.9 }}>
        {/*<Lingala name="Benna" />*/}
        <Text style={{ fontSize: 30, margin: 25, fontWeight: 'bold', color: 'red' }}> Service indisponible </Text>
      </View>
      <View style={{ backgroundColor: 'yellow', padding: 5, borderWidth: 5, borderColor: "green", borderRadius: 12 }}>
        <Button
          title="Terminer"
          onPress={() => navigation.navigate('AFROai')}
        />
      </View>
    </ImageBackground>
  );
}

function DetailsScreen() {
  return (
    <ImageBackground source={bg2} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <SafeAreaView style={styles_s.container}>
        <ScrollView style={styles_s.scrollView}>
          <Text style={styles_s.text}>
            <Text style={{ fontSize: 25, color: "green", fontWeight: "bold" }}>🗣️Reconnaissance Vocale Wolof</Text> {'\n\n'}
            <Text style={{ fontSize: 16, }}>La reconnaissance Vocale nous permet de communiquer avec une machine à partir de la parole.
{'\n\n'}C’est grâce à la reconnaissance vocale que tous les assistants vocaux ont vu le jour, parmi elle on peut citer siri sur apple et Alexa etc … {'\n\n'}
Et comme vous l’aurez sûrement deviné, la reconnaissance vocale existe que dans certaines langues bien définies , parmi elles on peut citer l’anglais le français le russes l'espagnol le chinois l’arabe etc … bref plusieurs langues occidentales et sans aucune langue ou dialecte africaine.
Alors un problème se pose pour tous ces africains qui ne parlent pas forcément une langue occidentale permettant la reconnaissance vocale. Comme c'est le cas au Sénégal.
C’est pourquoi nous avons décidé de mettre en place un système de reconnaissance vocale en wolof.{'\n\n'}
Pour ce faire nous avons besoin de beaucoups de données audios de personnes différentes qui prononcent
des mots et des phrases une centaine voir même des milliers de fois en wolof.

{'\n\n'}
C’est pourquoi, nous vous sollicitons.
{'\n\n'}
Pour le moment, nous avons juste besoin des données audio des chiffres suivants.{"\n"}
" De Benn jusqua Fukk " en Wolof {"\n"}
c'est à dire " de Un a dix " en Francais
{'\n\n'}
Nous vous invitons à naviguer vers l'écran AFROai puis cliquer sur le Bouton Compter en Wolof pour commencer à contribuer.
Dans chaque enregistrement audio que vous ferez, vous prononcerez le chiffre qui sera affiché.
{'\n\n'}
              <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', color: 'red', fontSize: 12, marginBottom: 3, fontFamily: 'Cochin' }} >Contribuer à la valorisation des Langues Afracaines</Text>
              <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', color: 'red', fontSize: 12, marginBottom: 30, fontFamily: 'Cochin' }} >Creer par Mr Barry Ibrahima ,Developpeur et Data Scientist. {'\n'}e-mail:ib9barry@gmail.com {'\n'}tel: 00221773655179</Text>
              {'\n\n'}
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}


function ManuelScreen() {
  return (
    <ImageBackground source={bg2} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <SafeAreaView style={styles_s.container}>
        <ScrollView style={styles_s.scrollView}>
          <Text style={styles_s.text}>
            <Text style={{ fontSize: 25, color: "green", fontWeight: "bold" }}>🗣️Reconnaissance Vocale Wolof</Text> {'\n\n'}
            <Text style={{ fontSize: 16, }}>Le but de cette application est la collecte de données en vue de mettre en place un système
            de reconnaissance vocale en wolof dans un premier temps.
{'\n\n'}
Si vous voulez contribuer, nous vous invitons à naviguer vers l'écran AFROai puis cliquer sur le Bouton Compter en Wolof
pour commencer à contribuer. Dans chaque enregistrement audio que vous ferez, vous prononcez le chiffre qui sera affiché.
La première chose à faire est de cliquer sur le micro et commencer l'enregistrement Ensuite Prononcer le chiffre correspondant
Benn (1) Une fois que cela est fait, Cliquez encore sur le micro pour arrêter l'enregistrement. Après ça, vous pourrez passer
au chiffre Suivant ou Recommencer l'enregistrement. Si vous passez au suivant, le chiffre que vous devriez prononcer sera Ñaar (2)
donc vous cliquez sur le micro pour commencer l'enregistrement, une fois terminé,
Cliquez encore sur le micro pour arrêter l'enregistrement, ainsi de suite jusqu'à Fukk (10).
{'\n\n'}
              <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', color: 'red', fontSize: 12, marginBottom: 3, fontFamily: 'Cochin' }} >Contribuer à la valorisation des Langues Afracaines</Text>
              <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', color: 'red', fontSize: 12, marginBottom: 30, fontFamily: 'Cochin' }} >, Creer par{'\n'}Mr Barry Ibrahima ,Developpeur et Data Scientist. {'\n'}E-mail : ib9barry@gmail.com {'\n'}Tel : 00221773655179</Text>
              {'\n\n'}

            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: 0, backgroundColor: '#FFE097', opacity: 0.9 }}>
      <ImageBackground source={bg} style={{ flex: 1, width: DEVICE_WIDTH, height: DEVICE_HEIGHT, flexDirection: "column", justifyContent: 'flex-start', alignItems: "center", padding: 0, margin: 0 }}>
        <SafeAreaView style={styles_s.container}>
          <ScrollView style={styles_s.scrollView}>
            <View style={{}}>
              <Text style={{ justifyContent: 'center', alignItems: "center", padding: 10, margin: 20, fontWeight: "bold", fontSize: 52, fontFamily: 'Cochin' }}>AFRO AI
                <Text style={{ justifyContent: 'center', alignItems: "center", color: 'green', fontSize: 13, fontFamily: 'Cochin' }}>Contribuer à la valorisation des Langues Africaines</Text>
              </Text>
            </View>
            <View style={{ marginTop: DEVICE_HEIGHT / 8, paddingHorizontal: 30 }}>
              <TouchableHighlight
                style={{ borderColor: 'green', borderWidth: 5, padding: 10, backgroundColor: 'yellow', borderRadius: 10, opacity: 0.8 }}
                onPress={() => navigation.navigate('WolofCollect')}
              >
                <Text style={{ color: 'green', fontWeight: "bold", fontSize: 25, fontFamily: 'Cochin', textAlign: 'center' }}>Compter en Wolof</Text>
              </TouchableHighlight>
            </View>
            <View style={{ marginTop: DEVICE_HEIGHT / 20, paddingHorizontal: 30 }}>
              {/*
              <TouchableHighlight
                style={{borderColor:'green' , borderWidth:5 , padding:10 , backgroundColor:'yellow' , borderRadius:10 , opacity:0.8}}
                onPress={() => navigation.navigate('PularCollect')}
              >

                <Text style={{ color:'green' , fontWeight:"bold" , fontSize:25 , fontFamily:'Cochin'}}>Compter en Pulaar</Text>
              </TouchableHighlight> */}
              <TouchableHighlight
                style={{ borderColor: 'green', borderWidth: 5, padding: 10, backgroundColor: 'yellow', borderRadius: 10, opacity: 0.8 }}
                onPress={() => navigation.navigate('LingalaCollect')}
              >

                <Text style={{ color: 'green', fontWeight: "bold", fontSize: 25, fontFamily: 'Cochin', textAlign: 'center' }}>Compter en Pulaar</Text>
              </TouchableHighlight>

            </View>
            <View style={{ marginTop: DEVICE_HEIGHT / 20, paddingHorizontal: 30 }}>
              <TouchableHighlight
                style={{ borderColor: 'green', borderWidth: 5, padding: 10, backgroundColor: 'yellow', borderRadius: 10, opacity: 0.8 }}
                onPress={() => navigation.navigate('LingalaCollect')}
              >
                <Text style={{ color: 'green', fontWeight: "bold", fontSize: 25, fontFamily: 'Cochin', textAlign: 'center' }}>Compter en Lingala</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


function SettingsScreen({ navigation }) {
  return (
    <ImageBackground source={bg2} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <SafeAreaView style={styles_s.container}>
        <ScrollView style={styles_s.scrollView}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE097', opacity: 0.8, paddingTop: DEVICE_HEIGHT / 4 }}>
            <TouchableHighlight
              style={{ borderColor: 'green', borderWidth: 5, paddingVertical: 10, paddingHorizontal: 45, backgroundColor: 'yellow', borderRadius: 15, margin: 15 }}
              onPress={() => navigation.navigate('Apropos')}
            >
              <Text style={{ color: 'green', fontWeight: "bold", fontSize: 30, fontFamily: 'Cochin' }}>Apropos</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ borderColor: 'green', borderWidth: 5, paddingVertical: 10, paddingHorizontal: 45, backgroundColor: 'yellow', borderRadius: 15, margin: 15 }}
              onPress={() => navigation.navigate('Manuel')}
            >
              <Text style={{ color: 'green', fontWeight: "bold", fontSize: 30, fontFamily: 'Cochin' }}> Manuel </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="AFROai" component={HomeScreen} />
      <HomeStack.Screen name="WolofCollect" component={WolofCollect1a10} />
      <HomeStack.Screen name="PularCollect" component={PularCollect1a10} />
      <HomeStack.Screen name="LingalaCollect" component={LingalaCollect1a10} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Parametre" component={SettingsScreen} />
      <SettingsStack.Screen name="Apropos" component={DetailsScreen} />
      <SettingsStack.Screen name="Manuel" component={ManuelScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'AFROai') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'parametre') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'green',
        }}
      >
        <Tab.Screen name="AFROai" component={HomeStackScreen} />
        <Tab.Screen name="parametre" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles_s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    margin: 0,
  },
  scrollView: {
    backgroundColor: '#FFE097',
    opacity: 0.8,
    marginHorizontal: 0,
    padding: 10,
    margin: 0,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    fontFamily: 'Cochin',
    textAlign: 'justify',

  },
});


const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#daaa0f",
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: "center",
  },
  wrapper: {
    marginTop: 100,
    padding: 1,
    borderColor: 'green',
    borderRadius: 30,
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    opacity: 0.9,
    width: 130,

  },
  halfScreenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: Icons.RECORD_BUTTON.height,
    maxHeight: Icons.RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: Icons.RECORD_BUTTON.height,
    maxHeight: Icons.RECORD_BUTTON.height,
    minWidth: Icons.RECORD_BUTTON.width * 3.0,
    maxWidth: Icons.RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: Icons.RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: Icons.THUMB_1.height * 2.0,
    maxHeight: Icons.THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: "stretch",
  },

  recordingTimestamp: {
    paddingLeft: 20,
  },
  liveText: {
    marginTop: 30,
    color: "#00ffff",
    fontSize: 30,

  },
  playbackTimestamp: {
    textAlign: "right",
    alignSelf: "stretch",
    paddingRight: 20,
  },
  textButton: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainerTopRow: {
    maxHeight: Icons.MUTED_BUTTON.height,
    alignSelf: "stretch",
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
    maxWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
  },


});



export default App;
