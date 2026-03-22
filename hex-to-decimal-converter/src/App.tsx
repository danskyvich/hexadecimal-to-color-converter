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
    .string().length(7).startsWith('#')
    .min(7, "Input must be equal to 7 characters")
    .max(7, "Input must be equal to 7 characters")
});

function MainPage() {

  const[values, setValues] = useState({r: '', g: '', b: '', rNum: 0, gNum: 0, bNum: 0, rgb: ''})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hexadecimal: '#ffffff'
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    //modify data here
    const hexInput = data.hexadecimal;
    
    const r = hexInput.substring(1,3);
    const g = hexInput.substring(3,5);
    const b = hexInput.substring(5,7)

    const rNum = parseInt(r,16)
    const gNum = parseInt(g, 16);
    const bNum = parseInt(b, 16);

    setValues({
      r,
      g,
      b,
      rNum,
      gNum,
      bNum,
      rgb: `rgb(${rNum},${gNum},${bNum})`
    })
  }

  return (
    <section className="flex flex-col w-full h-dvh m-0 p-0">
      {/**Header */}
      <header className="flex flex-1 w-full h-fit px-5 md:px-20 py-5 gap-5 bg-stone-800">
        <img src="/favicon.svg" alt="logo" className="sm:w-20 w-15 h-auto " />
        <div className="flex flex-1 flex-col w-full h-fit">
          <p className="font-semibold text-x sm:text-2xl text-white">
            Hexadecimal to Decimal Converter
          </p>
          <p className="text-white">
            by <b>Danilo Pelin</b>
          </p>
        </div>
      </header>

      {/**Main content */}
      <section className="flex flex-8 flex-col items-center pb-10 sm:flex-row w-full h-auto px-0 md:px-10 py-3 gap-10 sm:gap-5 md:gap-20">
        {/**Left side */}
        <div className="flex flex-1 flex-col w-[50dvw] h-full sm:pl-[10dvw] items-end">
          <div className="flex flex-1 h-auto w-full" />
          <Field className="flex flex-1 h-auto w-full" orientation={"vertical"}>
            {/**Instructions */}
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
              className={`w-[10dvw] h-[20dvh] border-2 border-stone-400 rounded-2xl shadow-xs mb-5`}
              style={{ backgroundColor: values.rgb }}
            />

            {/** FORM  */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                name="hexadecimal"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Enter a hexadecimal input
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align={"inline-start"}>
                        <ArrowDownToDotIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your input here..."
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <Button
                      variant="default"
                      className="hover:cursor-pointer hover:bg-stone-700 hover:shadow-2xl"
                    >
                      <p>Submit</p>
                    </Button>
                  </Field>
                )}
              ></Controller>
            </form>
          </Field>

          <div className="flex flex-1 w-full h-auto" />
        </div>

        {/**Right side */}
        <div className="flex flex-1 flex-col w-[50dvw] h-full items-start p-0 sm:pr-[10dvw] justify-center">
          {/**Grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-11 sm:grid-rows-5 gap-2 sm:gap-4 divide-solid border-2 p-2 item rounded-xl w-full sm:w-fit">
            {/**Rows */}
            <div className="sm:col-span-3 sm:text-center font-bold text-stone-800 border-2 p-2 w-full rounded-xl">
              RGB colors
            </div>
            <div className="sm:row-start-2 border-2 px-2 sm:py-5 content-center rounded-xl">
              Red (r)
            </div>
            <div className="sm:row-start-2 border-2 px-2 content-center rounded-xl">
              {values.r}
            </div>
            <div className="sm:row-start-2 border-2 px-2 content-center rounded-xl">
              {values.rNum}/255
            </div>
            <div className="sm:row-start-3 border-2 px-2 content-center rounded-xl">
              Green (g)
            </div>
            <div className="sm:row-start-3 border-2 px-2 content-center rounded-xl">
              {values.g}
            </div>
            <div className="sm:row-start-3 border-2 px-2 content-center rounded-xl">
              {values.gNum}/255
            </div>
            <div className="sm:row-start-4 border-2 px-2 content-center rounded-xl">
              Blue (b)
            </div>
            <div className="sm:row-start-4 border-2 px-2 content-center rounded-xl">
              {values.b}
            </div>
            <div className="sm:row-start-4 border-2 px-2 content-center rounded-xl">
              {values.bNum}/255
            </div>
            <div className="sm:col-span-3 row-start-5 italic font-semibold sm:text-center border-2 px-2 content-center rounded-xl">
              {values.rgb}
            </div>
          </div>
        </div>
      </section>

      {/**Footer */}
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