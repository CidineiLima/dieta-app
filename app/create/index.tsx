import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "@/constants/colors"
import { Header } from "@/components/header"
import { Select } from "@/components/input/select"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from "expo-router";
import { useDataStore } from '@/store/data'

const schema = z.object({
 gender: z.string().min(1, { message: "O sexo é obrigatório"}),
 level: z.string().min(1, { message: "Selecione seu nivel"}),
 objective: z.string().min(1, { message: "O objetivo é obrigatório"}),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const {control, handleSubmit, formState: {errors, isValid} } = useForm<FormData>({
    resolver: zodResolver(schema)
})

const genderOptions = [
  { label: "Masculino", value: "masculino"},
  { label: "Feminino", value: "feminino"},
]

const levelOptions = [
  { label: "Sedentário (pouco ou nenhuma atividade física)", value: "Sedentário"},
  { label: "Levemente ativo (exercícios 1 a 3 vezes por semana)", value: "Levemente ativo (exercícios 1 a 3 vezes por semana)"},
  { label: "Moderadamente ativo (exercícios 3 a 5 vezes por semana)", value: "Moderadamente ativo (exercícios 3 a 5 vezes por semana)"},
  { label: "Altamente ativo (exercícios 5 a 7 vezes por semana)", value: "Altamente ativo (exercícios 5 a 7 vezes por semana)"},
]

const objectiveOptions = [
  { label: "Emagrecer", value: "emagrecer"},
  { label: "Hipertrofia", value: "hipertrofia"},
  { label: "Hipertrofia + Definição", value: "hipertrofia e definição"},
  { label: "Definição", value: "definição"},
]

const setPageTwo = useDataStore(state => state.setPageTwo)

function handleCreate(data: FormData){
  setPageTwo({
    level: data.level,
    gender: data.gender,
    objective: data.objective,
  })
  router.push("/nutrition")
  }
  
 return (
   <View style={styles.container}>
    <Header step='Passo 2' title='Finalizando Dieta' />

    <ScrollView style={styles.content}>

    <Text style={styles.label}>Sexo:</Text>
    <Select
    control={control}
    name="gender"
    placeholder="Selecione seu sexo..."
    error={errors.gender?.message}
    options={genderOptions}
    />

    <Text style={styles.label}>Selecione nível de atividade física:</Text>
    <Select
    control={control}
    name="level"
    placeholder="Selecione nível de atividade física..."
    error={errors.level?.message}
    options={levelOptions}
    />

    <Text style={styles.label}>Selecione seu objetivo:</Text>
    <Select
    control={control}
    name="objective"
    placeholder="Selecione objetivo..."
    error={errors.objective?.message}
    options={objectiveOptions}
    />

    <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
        <Text style={styles.buttonText}>
          Avançar  
        </Text>
    </Pressable>

    </ScrollView>

   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});