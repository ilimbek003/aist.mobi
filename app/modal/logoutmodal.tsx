import React, { useMemo, forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export type ModalProps = {
  ref: React.RefObject<BottomSheetModal>;
};

const LogOutModal = forwardRef<BottomSheetModal, {}>((_, ref) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default LogOutModal;
