import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as ImagePicker from 'expo-image-picker'
import * as Crypto from 'expo-crypto'

import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  ActionsOverrall,
  Container,
  Content,
  ContentInput,
  Image,
  Text,
  TextOver,
  Title,
  TouchImage,
  TouchMinus,
  TouchPlus,
  ViewOver,
} from './styles'
import defaultImg from '../../assets/logos/escudo_cinza.png'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { useClubs } from '../../hook/useClubs'
import { ClubComplete } from '../../Model/Club'
import { Minus, Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'

type DataSchema = {
  name: string
  nameCompleted: string
  sigla: string
  stadium: string
}

export interface CreateClubRouteParams {
  club: ClubComplete | undefined
}

const schema = yup
  .object({
    name: yup.string().required(),
    nameCompleted: yup.string().required(),
    sigla: yup.string().required(),
    stadium: yup.string().required(),
  })
  .required()

export function CreateClub() {
  const { goBack } = useNavigation()
  const { club } = useRoute().params as CreateClubRouteParams
  const { addClub, updateClub } = useClubs()
  const {
    colors: { white },
  } = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: club ? club.name : '',
      nameCompleted: club ? club.nameComplete : '',
      sigla: club ? club.sigla : '',
      stadium: club ? club.stadium : '',
    },
  })

  const [loadingImg, setLoadingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageClub, setImageClub] = useState<ImageSourcePropType | null>(null)
  const [overrall, setOverrall] = useState(50)
  const [isEdit, setIsEdit] = useState(false)
  const [disabledCamps, setDisabledCamps] = useState(false)
  const [clubId, setClubId] = useState('')

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      setLoadingImg(true)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.75,
        base64: true,
      })

      if (!result.canceled) {
        const imageAsset = result.assets[0]
        const typeImage = imageAsset.uri.split('.').pop()
        const base64Image = `data:image/${typeImage};base64,${imageAsset.base64}`
        setImageClub({ uri: base64Image })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingImg(false)
    }
  }

  function resetDados() {
    setOverrall(50)
    setImageClub(null)
  }

  function handleUpdateOverrall(value: number) {
    const sumOver = overrall + value
    if (sumOver <= 99 && sumOver >= 40) {
      if (sumOver % 1 !== 0) {
        setOverrall(sumOver + (value < 0 ? 0.5 : -0.5))
      } else {
        setOverrall(sumOver)
      }
    }
  }

  async function handleCreateClub(data: DataSchema) {
    try {
      setLoading(true)
      if (imageClub === null) {
        return
      }

      if (clubId !== '' && club !== undefined) {
        const newClubEdit: ClubComplete = {
          name: data.name,
          nameComplete: data.nameCompleted,
          sigla: data.sigla,
          stadium: data.stadium,
          logo: imageClub,
          overall: overrall,
          disabled: club.disabled,
          createdForUser: club.disabled,
          id: clubId,
        }

        await updateClub(clubId, newClubEdit)
      } else {
        const newClub: ClubComplete = {
          name: data.name,
          nameComplete: data.nameCompleted,
          sigla: data.sigla,
          stadium: data.stadium,
          logo: imageClub,
          overall: overrall,
          disabled: false,
          createdForUser: true,
          id: Crypto.randomUUID(),
        }

        await addClub(newClub)
      }
      resetDados()
      goBack()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (club !== undefined) {
      setImageClub(club.logo)
      setOverrall(club.overall)

      setDisabledCamps(!club.createdForUser)
      setIsEdit(true)
      setClubId(club.id)
    }
  }, [club, club?.id])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack
          title={isEdit ? 'Editar clube' : 'Criar novo clube'}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={{ paddingTop: 30, paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            <TouchImage
              activeOpacity={0.7}
              onPress={pickImage}
              disabled={disabledCamps}
            >
              {loadingImg ? (
                <Loading />
              ) : (
                <Image source={imageClub || defaultImg} alt="" />
              )}
            </TouchImage>
            <Content>
              <ContentInput>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nome"
                      invalid={errors.name !== undefined}
                      editable={!disabledCamps}
                    />
                  )}
                />
                {errors.name && <Text>{errors.name.message}</Text>}
              </ContentInput>
              <ContentInput>
                <Controller
                  control={control}
                  name="nameCompleted"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nome completo"
                      invalid={errors.nameCompleted !== undefined}
                      editable={!disabledCamps}
                    />
                  )}
                />
                {errors.nameCompleted && (
                  <Text>{errors.nameCompleted.message}</Text>
                )}
              </ContentInput>
              <ContentInput>
                <Controller
                  control={control}
                  name="sigla"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      placeholder="Sigla"
                      invalid={errors.sigla !== undefined}
                      editable={!disabledCamps}
                    />
                  )}
                />
                {errors.sigla && <Text>{errors.sigla.message}</Text>}
              </ContentInput>
              <ContentInput>
                <Controller
                  control={control}
                  name="stadium"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      placeholder="Estádio"
                      invalid={errors.stadium !== undefined}
                      editable={!disabledCamps}
                    />
                  )}
                />
                {errors.stadium && <Text>{errors.stadium.message}</Text>}
              </ContentInput>

              <Title>Overrall</Title>
              <ActionsOverrall>
                <TouchMinus
                  activeOpacity={0.7}
                  onPress={() => handleUpdateOverrall(-1)}
                  disabled={overrall <= 40}
                >
                  <Minus size={32} color={white} />
                </TouchMinus>
                <ViewOver>
                  <TextOver>{overrall}</TextOver>
                </ViewOver>
                <TouchPlus
                  activeOpacity={0.7}
                  onPress={() => handleUpdateOverrall(1)}
                  disabled={overrall >= 99}
                >
                  <Plus size={32} color={white} />
                </TouchPlus>
              </ActionsOverrall>

              <Button
                style={{ marginTop: 40 }}
                title={isEdit ? 'Atualizar clube' : 'Criar clube'}
                loading={loading}
                onPress={handleSubmit(handleCreateClub)}
              />
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </Background>
  )
}
