import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/input-group";
import { Field, FieldError, FieldLabel } from "./components/field";
import { Card, CardContent, CardHeader } from "./components/card";
import { Separator } from "./components/separator";
import { ArrowDownToDotIcon } from "lucide-react";
import { Button } from "./components/button";
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useState } from "react";


const formSchema = z.object({
  hexadecimal: z
    .string()
    .min(7, "Input must be equal to 7 characters (including the # )")
    .max(7, "Input must be equal to 7 characters (including the # )"),
});

function MainPage() {

  const[values, setValues] = useState({r: '', g: '', b: '', rNum: 0, gNum: 0, bNum: 0, rgb: ''})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hexadecimal: '#000000'
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    //modify data here
    const hexInput = JSON.stringify(data);
    setValues.arguments(
      hexInput.substring(1, 3),
      hexInput.substring(3, 5),
      hexInput.substring(5, 7),
      parseInt(hexInput.substring(1, 3), 16),
      parseInt(hexInput.substring(3, 5), 16),
      parseInt(hexInput.substring(5, 7), 16),
      `rgb(${parseInt(hexInput.substring(1, 3), 16)},${parseInt(hexInput.substring(3, 5), 16)}, ${parseInt(hexInput.substring(5, 7), 16)})`,
    );
  }

  return (
    <section className="flex flex-col w-dvw h-dvh bg-stone-100 m-0 p-0">
      <header className="flex flex-0 w-full h-fit px-20 py-5 gap-5 bg-stone-800">
        <img src="/favicon.svg" alt="logo" className="w-20 h-20 " />
        <div className="flex flex-1 flex-col w-full h-fit">
          <p className="font-semibold text-2xl text-white">
            Hexadecimal to Decimal Converter
          </p>
          <p className="text-white">
            by <b>Danilo Pelin</b>
          </p>
        </div>
      </header>

      <section className="flex flex-8 w-full h-auto px-20 py-3 gap-20">
        {/**Left side */}
        <div className="flex flex-1 flex-col w-[50dvw] h-full pl-[10dvw] items-end">
          <div className="flex flex-1 h-auto w-full" />
          <Field
            className="flex flex-1 h-auto w-full max-w-sm"
            orientation={"vertical"}
          >
            <Card>
              <CardHeader>
                <p className="text-xl">Instructions</p>
                <Separator orientation="horizontal" />
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-stone-700">
                    The input must be a hexadecimal one. Always begin with a
                    hashtag (#) symbol
                  </li>
                  <li className="text-stone-700">
                    Click the button below to see its decimal and RGB equivalent
                  </li>
                  <li className="text-stone-700">
                    The table on the right breaks down the hexadecimal input
                    into it{" "}
                  </li>
                </ol>
              </CardContent>
            </Card>
            {/**Color display */}
            <div
              id="colorDisplay"
              className={`w-[10dvw] h-[20dvh] ${values.rgb} border-2 border-stone-400 rounded-2xl shadow-xs mb-5`}
            />

            {/** FORM  */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
              name='hexadecimal'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor={field.name}>Enter a hexadecimal input</FieldLabel>
                  <InputGroupAddon align={'inline-start'}>
                    <ArrowDownToDotIcon/>
                  </InputGroupAddon>
                  <InputGroup>
                    <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your input here...'
                    autoComplete='off'
                    />
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  <Button
                    variant='default'
                  >
                    <p>Submit</p>
                  </Button>
                </Field>
              )}
            >

            </Controller>
            </form>
          </Field>

          <div className="flex flex-1 w-full h-auto" />
        </div>

        {/**Right side */}
        <div className="flex flex-1 flex-col w-[50dvw] h-full items-start pr-[10dvw] justify-center">
          <div className="grid grid-cols-3 grid-rows-5 gap-4 divide-solid border-2 p-2 item rounded-xl">
            <div className="col-span-3 text-center font-bold text-stone-800 border-2 p-2 w-full rounded-xl">
              RGB colors
            </div>
            <div className="row-start-2 border-2 px-2 py-5 content-center rounded-xl">
              Red (r)
            </div>
            <div className="row-start-2 border-2 px-2 content-center rounded-xl">
              {values.r}
            </div>
            <div className="row-start-2 border-2 px-2 content-center rounded-xl">
              {values.rNum}/255
            </div>
            <div className="row-start-3 border-2 px-2 content-center rounded-xl">
              Green (g)
            </div>
            <div className="row-start-3 border-2 px-2 content-center rounded-xl">
              {values.g}
            </div>
            <div className="row-start-3 border-2 px-2 content-center rounded-xl">
              {values.gNum}/255
            </div>
            <div className="row-start-4 border-2 px-2 content-center rounded-xl">
              Blue (b)
            </div>
            <div className="row-start-4 border-2 px-2 content-center rounded-xl">
              {values.b}
            </div>
            <div className="row-start-4 border-2 px-2 content-center rounded-xl">
              {values.bNum}/255
            </div>
            <div className="col-span-3 row-start-5 text-center border-2 px-2 content-center rounded-xl">
              {values.rgb}
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-1 flex-col w-full h-[10%] bg-stone-600 text-center py-[2dvh] justify-center text-white">
        <p>Made w/ luv @ 2025</p>
        <a
          href="https://daniloppelin.vercel.app"
          className="hover:underline"
        ></a>
      </footer>
    </section>
  );
}

export default MainPage;