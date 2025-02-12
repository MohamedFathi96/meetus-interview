import { Flex, Title, Text, TextInput, PasswordInput, Button } from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import imgUrl from "../../assets/images/clipboard-image-1739351733.png";
import textImgUrl from "../../assets/images/text.png";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import axios from "axios";

import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../stores/auth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const schema = z.object({
    email: z.string().min(1, "Email is required.").email("Invalid email."),
    password: z.string().min(1, "Password is required."),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          email: values.email,
          password: values.password,
          isEmployee: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      document.cookie = `token=${response.data.token}; path=/; HttpOnly`;
      sessionStorage.setItem("token", response.data.token);
      setUser(response.data.userInfo);
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);

        if (error.response?.data.message === "Invalid credentials!") form.setErrors({ email: "Invalid email." });
        else if (error.response?.data.message === "Bad credentials") form.setErrors({ password: "Invalid password." });
      }
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="bg-gradient-to-br from-[#e0e7ff] via-[#f5a9f7] to-[#b19cd9] h-screen justify-center items-center gap-12 flex abeezee-regular"
    >
      <Flex direction="column" className="text-center gap-4 max-w-[330px]">
        <Title order={1} ff="abeezee-regular">
          Welcome back
        </Title>
        <Text className="max-w-[40ch]">Step into our shopping metaverse for an unforgettable shopping experience</Text>

        <Flex direction="column">
          <TextInput
            {...form.getInputProps("email")}
            placeholder="Your email"
            mt={16}
            leftSection={<IconMail size={16} />}
          />
          <PasswordInput
            {...form.getInputProps("password")}
            leftSection={<IconLock />}
            placeholder="password"
            mt="md"
          />
        </Flex>

        <Button mt={16} variant="filled" color="indigo" type="submit" disabled={!form.isValid()}>
          Login
        </Button>
      </Flex>
      <div className="hidden sm:flex flex-col">
        <img src={imgUrl} className="max-w-[300px]" />
        <img src={textImgUrl} className="max-w-[300px] mt-[-110px]" />
      </div>
    </form>
  );
};

export default Login;
