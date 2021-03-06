import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Modal, Image } from "react-native";
import { getMapLocation } from "../helpers/getLocation";
import {
  Button,
  Card,
  Text,
  CardItem,
  Icon,
  Thumbnail,
} from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import colores from '../Components/colorPalette';
import LoadingView from "../views/pagCarga";
import markerPet from "../assets/iconos/marker_paw.png";
import markerMan from "../assets/iconos/marker_man.png";


export default function InfoPerro({ mascota, usuario, handlerRender }) {
  const [foto] = useState(mostrarFoto(mascota.petPicture));
  const windowWidth = Dimensions.get("window").width;

  function renderMapInfo(){
  
    return (
      <MapView
        region={getMapLocation(mascota.location, usuario.location)}
        style={{ height: "100%", width: null }}
      >
        <Marker
          coordinate={{
            longitude: mascota.location.longitude,
            latitude: mascota.location.latitude,
          }}
          identifier="mkMascota"
          title="mascota"
          pinColor="blue"
        >
          <Text style={{ height: 40 }}>
            <Image
              source={markerPet}
              style={{
                height: 30,
                width: 30,
                resizeMode: "contain",
              }}
            />
          </Text>
        </Marker>
        <Marker
          coordinate={{
            longitude: usuario.location.longitude,
            latitude: usuario.location.latitude,
          }}
          identifier="mkUsuario"
        >
          <Text style={{ height: 40 }}>
            <Image
              source={markerMan}
              style={{
                height: 30,
                width: 30,
                resizeMode: "contain",
              }}
            />
          </Text>
        </Marker>
      </MapView>
    );
  }

 

   return (
     <Modal
       animationType="slide"
       transparent={false}
       visible={true}
       presentationStyle="pageSheet"
       onRequestClose={() => handlerRender(false, "tarjetas")}
     >
       <View style={{ height: 430, width: null }}>{renderMapInfo()}</View>
       <View>
         <Card
           style={{
             borderTopRightRadius: 40,
             borderTopLeftRadius: 40,
             marginTop: -50,
             height: "100%",
           }}
         >
           <Thumbnail
             source={{ uri: foto }}
             style={{
               marginLeft: windowWidth / 2 - 90,
               marginTop: -90,
               height: 180,
               width: 180,
               borderRadius: 180 / 2,
               borderWidth: 3,
               borderColor: "#f2f2f2",
             }}
           />

           <View style={{ flexDirection: "row", justifyContent: "center" }}>
             <Text style={{ color: colores.main, fontSize: 25, marginTop: 15 }}>
               {mascota.petName}
             </Text>
           </View>

           <CardItem header>
             <Text style={{ color: "grey" }}> Descripci??n</Text>
           </CardItem>
           <CardItem style={{ marginTop: -15, marginBottom: 15 }}>
             <Text style={{ color: "grey" }}>{mascota.petDescription}</Text>
           </CardItem>

           <View style={{ flexDirection: "row", justifyContent: "center" }}>
             <Card style={styles.charCard}>
               <Text style={styles.cardText}>{mascota.petSex}</Text>
             </Card>
             <Card style={styles.charCard}>
               <Text style={styles.cardText}>{mascota.petSize}</Text>
             </Card>
             <Card style={styles.charCard}>
               <Text style={styles.cardText}>{mascota.petColor}</Text>
             </Card>
           </View>

           <View style={{ flexDirection: "row", marginTop: 10 }}>
             <Button
               info
               block
               onPress={() => handlerRender(false, "chat")}
               style={styles.mainButtons}
             >
               <Text>Mensajes</Text>
               <Icon name="message1" type="AntDesign" />
             </Button>

             <Button info block style={styles.mainButtons}>
               <Text>Compartir</Text>
               <Icon name="share" type="Entypo" />
             </Button>
           </View>
         </Card>
       </View>
     </Modal>
   );

     return (
       <Modal
         animationType="slide"
         transparent={false}
         visible={true}
         presentationStyle="pageSheet"
         onRequestClose={() => handlerRender(false, "tarjetas")}
       >
         <View style={{ height: 350, width: null }}>
           <Image source={{ uri: foto }} style={{ flex: 1 }} />
         </View>
         <View>
           <Card
             style={{
               borderTopRightRadius: 40,
               borderTopLeftRadius: 40,
               marginTop: -40,
               marginLeft: -1,
               width: Dimensions.get("window").width + 1,
               height: "100%",
             }}
           >
             <Card
               style={{
                 //marginLeft: windowWidth / 2 - 50,
                 marginTop: -25,
                 height: 50,
                 width: 150,
                 borderRadius: 15,
                 //borderRadius: 100 / 2,
                 alignSelf: "center",
                 alignItems: "center",
                 /* borderWidth: 3,
              borderColor: "#f2f2f2", */
               }}
             >
               <Text
                 style={{
                   marginTop: 15,
                   fontWeight: "bold",
                   color: colores.main,
                 }}
               >
                 {mascota.petName}
               </Text>
             </Card>

             <Card style={{ marginTop: 20, height: 110, width: null }}>
               {renderMapInfo()}
             </Card>

             <View>
               <CardItem header>
                 <Text style={{ color: "grey" }}> Descripci??n</Text>
               </CardItem>
               <CardItem style={{ marginTop: -15, marginBottom: 15 }}>
                 <Text style={{ color: "grey" }}>{mascota.petDescription}</Text>
               </CardItem>

               <View
                 style={{
                   flexDirection: "row",
                   justifyContent: "center",
                   marginTop: 15,
                 }}
               >
                 <Card style={styles.charCard}>
                   <Text style={styles.cardText}>{mascota.petSex}</Text>
                 </Card>
                 <Card style={styles.charCard}>
                   <Text style={styles.cardText}>{mascota.petSize}</Text>
                 </Card>
                 <Card style={styles.charCard}>
                   <Text style={styles.cardText}>{mascota.petColor}</Text>
                 </Card>
               </View>
             </View>

             <View
               style={{
                 flexDirection: "row",
                 marginTop: 40,
                 alignContent: "center",
                 alignSelf: "center",
               }}
             >
               <Button
                 block
                 onPress={() => handlerRender(false, "chat")}
                 style={{
                   borderRadius: 5,
                   width: "50%",
                   backgroundColor: colores.mainFill,
                 }}
               >
                 <Text>Mensajes</Text>
                 <Icon name="message1" type="AntDesign" />
               </Button>
             </View>
           </Card>
         </View>
       </Modal>
     );
}


const styles = StyleSheet.create({
  charCard: {
    height: 40,
    width: 110,
    elevation: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    shadowColor: "rgba(255,255,255,255)",
    borderColor: "rgba(255,255,255,255)",
  },
  cardText: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    letterSpacing: 1,
    color: colores.main,
  },
  mainButtons: {
    borderRadius: 5,
    width: "40%",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: colores.mainFill,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});