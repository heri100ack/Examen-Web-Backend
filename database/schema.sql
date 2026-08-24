--
-- PostgreSQL database dump
--

\restrict TZR1r1Eo3p1aHrv4yZumRq3L4IRRtgbjMAsWlPKrK2TJgsa2IDlVFzrF7ZgtV22

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: mamode
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'STUDENT'
);


ALTER TYPE public.user_role OWNER TO mamode;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    attempt_id integer NOT NULL,
    question_id integer NOT NULL,
    choice_id integer
);


ALTER TABLE public.answers OWNER TO mamode;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answers_id_seq OWNER TO mamode;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: attempts; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.attempts (
    id integer NOT NULL,
    exam_id integer NOT NULL,
    student_id integer NOT NULL,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.attempts OWNER TO mamode;

--
-- Name: attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attempts_id_seq OWNER TO mamode;

--
-- Name: attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.attempts_id_seq OWNED BY public.attempts.id;


--
-- Name: choices; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.choices (
    id integer NOT NULL,
    question_id integer NOT NULL,
    text text NOT NULL,
    is_correct boolean NOT NULL
);


ALTER TABLE public.choices OWNER TO mamode;

--
-- Name: choices_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.choices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.choices_id_seq OWNER TO mamode;

--
-- Name: choices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.choices_id_seq OWNED BY public.choices.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.courses OWNER TO mamode;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO mamode;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: exams; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    course_id integer NOT NULL,
    title text NOT NULL,
    description text,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    CONSTRAINT chk_exam_dates CHECK ((end_time > start_time))
);


ALTER TABLE public.exams OWNER TO mamode;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exams_id_seq OWNER TO mamode;

--
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    exam_id integer NOT NULL,
    text text NOT NULL,
    points integer NOT NULL,
    CONSTRAINT questions_points_check CHECK ((points > 0))
);


ALTER TABLE public.questions OWNER TO mamode;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO mamode;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: mamode
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role public.user_role NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.users OWNER TO mamode;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mamode
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO mamode;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mamode
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: attempts id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.attempts ALTER COLUMN id SET DEFAULT nextval('public.attempts_id_seq'::regclass);


--
-- Name: choices id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.choices ALTER COLUMN id SET DEFAULT nextval('public.choices_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: attempts attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT attempts_pkey PRIMARY KEY (id);


--
-- Name: choices choices_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_pkey PRIMARY KEY (id);


--
-- Name: courses courses_code_key; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_code_key UNIQUE (code);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: attempts unique_attempt; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT unique_attempt UNIQUE (exam_id, student_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: answers fk_answer_attempt; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answer_attempt FOREIGN KEY (attempt_id) REFERENCES public.attempts(id) ON DELETE CASCADE;


--
-- Name: answers fk_answer_choice; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answer_choice FOREIGN KEY (choice_id) REFERENCES public.choices(id) ON DELETE RESTRICT;


--
-- Name: answers fk_answer_question; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE RESTRICT;


--
-- Name: attempts fk_attempt_exam; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT fk_attempt_exam FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE RESTRICT;


--
-- Name: attempts fk_attempt_student; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT fk_attempt_student FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE RESTRICT;


--
-- Name: choices fk_choice_question; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT fk_choice_question FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: exams fk_exam_course; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT fk_exam_course FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE RESTRICT;


--
-- Name: questions fk_question_exam; Type: FK CONSTRAINT; Schema: public; Owner: mamode
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_question_exam FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict TZR1r1Eo3p1aHrv4yZumRq3L4IRRtgbjMAsWlPKrK2TJgsa2IDlVFzrF7ZgtV22

