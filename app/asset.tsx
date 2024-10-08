import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { getImagekitUrlFromPath } from '~/utils/imagekit';
import { ResizeMode, Video } from 'expo-av';

import { useMedia } from '~/providers/MediaProvider';

export default function AssetPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAssetById, syncToCloud } = useMedia();

  const asset = getAssetById(id);
  console.log(JSON.stringify(asset, null, 2));

  if (!asset) {
    return <Text>Asset not found!</Text>;
  }

  const uri = getImagekitUrlFromPath('72768a4f-3db5-4b31-bb23-236f61997dc7/IMG_0082.JPG', [
    { width: 200, height: 200 },
    {
      raw: 'l-text,i-notJust.dev,co-ffffff,fs-30,l-end',
    },
  ]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Photo',
          headerRight: () => (
            <AntDesign
              onPress={() => syncToCloud(asset)}
              name="cloudupload"
              size={24}
              color="black"
            />
          ),
        }}
      />
      {asset.mediaType === 'photo' ? (
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="contain" />
      ) : (
        <Video
          style={{ width: '100%', height: '100%' }}
          source={{
            uri,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
    </>
  );
}
