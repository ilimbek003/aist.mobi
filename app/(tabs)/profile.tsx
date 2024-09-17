import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  getToken,
  deleteToken as removeToken,
} from "../../components/SecureStore/SecureStore";
import Profiles from "@/components/pages/Profiles";
import Profile from "../profile/Profile";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

type TokenType = string | null;

export default function ProfileScreen() {
  const { openContactModal } = useLocalSearchParams();
  const [token, setToken] = useState<TokenType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefs = useRef<BottomSheetModal>(null);
  const bottomSheetModal = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "30%"], []);
  const snapPointss = useMemo(() => ["25%", "25%"], []);

  useEffect(() => {
    if (openContactModal) {
      bottomSheetModal.current?.present();
    }
  }, [openContactModal]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRefs.current?.close();
    bottomSheetModal.current?.close();
  }, []);

  const handlePresentModalPres = useCallback(() => {
    bottomSheetModalRefs.current?.present();
    bottomSheetModalRef.current?.close();
    bottomSheetModal.current?.close();
  }, []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRefs.current?.close();
    bottomSheetModalRef.current?.close();
    bottomSheetModal.current?.present();
  }, []);

  const handleDeleteToken = async () => {
    setIsLoading(true);
    try {
      await removeToken();
      setToken(null);
      Alert.alert("Успех", "вы успешно вышли из аккаунта");
      bottomSheetModalRefs.current?.close();
      bottomSheetModalRef.current?.close();
      bottomSheetModal.current?.close();
      router.push("/");
    } catch (error) {
      console.error("Failed to delete the token", error);
      Alert.alert("Ошибка", "Не удалось удалить токен.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const fetchedToken: TokenType = await getToken();
      const response = await axios.delete(
        "https://aist.mobi/auth/delete-account",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${fetchedToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        Alert.alert("Успех", "Ваш аккаунт был успешно удален.");
        router.push("/");
      } else {
        Alert.alert("Ошибка", "Не удалось удалить аккаунт. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Failed to delete the account", error);
      Alert.alert("Ошибка", "Произошла ошибка при удалении аккаунта.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken: TokenType = await getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, []);

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <View style={styles.contentContainer}>
      {token ? (
        <Profile
          handleOpen={handlePresentModalPress}
          handleOpens={handlePresentModalPres}
          openModal={handlePresentModal}
        />
      ) : (
        <Profile
          handleOpen={handlePresentModalPress}
          handleOpens={handlePresentModalPres}
          openModal={handlePresentModal}
        />
      )}
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={Backdrop}
        >
          <BottomSheetView style={styles.container}>
            <Text style={styles.text}>Выйти с аккаунта?</Text>
            <Text style={styles.texts}>
              Вам придется повторно выполнить авторизацию
            </Text>
            <Pressable
              style={styles.button}
              onPress={handleDeleteToken}
              disabled={isLoading}
            >
              <Text style={styles.text_button}>
                {isLoading ? "Загрузка..." : "Выйти"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttons}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              <Text style={styles.text_buttons}>Отмена</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRefs}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={Backdrop}
        >
          <BottomSheetView style={styles.container}>
            <Text style={styles.text}>Удалить аккаунт?</Text>
            <Text style={styles.texts}>
              Ваш аккаунт удалится насвегда, и вам придется заново
              зарегистрироваться
            </Text>
            <Pressable
              style={styles.button}
              onPress={handleDeleteAccount}
              disabled={isLoading}
            >
              <Text style={styles.text_button}>
                {isLoading ? "Загрузка..." : "Удалить"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttons}
              onPress={() => bottomSheetModalRefs.current?.dismiss()}
            >
              <Text style={styles.text_buttons}>Отмена</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModal}
          index={0}
          snapPoints={snapPointss}
          backdropComponent={Backdrop}
        >
          <BottomSheetView style={styles.container}>
            <Text style={styles.text}>Связаться с нами</Text>
            <View style={styles.blocks}>
              <Link href="tel:+7 999 999 99 99">
                <View style={styles.block}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/ic_call_48px.png")}
                  />
                </View>
              </Link>
              <Link href="https://wa.me/+7 999 999 99 99">
                <View style={styles.block}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/fat.png")}
                  />
                </View>
              </Link>
              <Link href="https://t.me/+7 999 999 99 99">
                <View style={styles.block}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/teleg.png")}
                  />
                </View>
              </Link>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    elevation: 9999,
    zIndex: 1000,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "var(--, rgba(25, 25, 25, 1))",
    textAlign: "center",
    marginTop: 10,
  },
  texts: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(160, 160, 160, 1)",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(232, 29, 29, 1)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text_button: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  buttons: {
    width: "100%",
    padding: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text_buttons: {
    color: "rgba(112, 112, 112, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  blocks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  block: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: "rgba(234, 234, 234, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 36,
    height: 36,
  },
});
