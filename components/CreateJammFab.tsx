import { Colors } from "@/constants/Colors";
import { Text, TouchableHighlight, useColorScheme, View } from "react-native";

type TCreateJammFabProps = {
    onPress: () => void;
    titleVerb: string
}

const CreateJammFab: React.FC<TCreateJammFabProps> = ({onPress, titleVerb}) => {
    const colorScheme = useColorScheme();
    return (
        <TouchableHighlight
        style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: [{ translateX: -75 }], // half of button width
        backgroundColor: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint,
        borderRadius: 100,
        padding: 18,
        width: 150,
        alignItems: 'center',
        elevation: 8
        }}
        onPress={onPress}
        >
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={{color: colorScheme === 'dark' ? Colors.light.text : Colors.dark.text, fontSize: 18}}>{titleVerb}</Text>
            <Text style={{color: Colors.dark.brandColor, fontSize: 18, textTransform: 'uppercase'}}>JAMM</Text>
        </View>
        </TouchableHighlight>
    )
}

export default CreateJammFab;