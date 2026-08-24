--
-- PostgreSQL database dump
--

\restrict AhBt9oRcqT0EpFWAs31jjPENY0N6BsckDkk7KxLWc6ZgrI0mpMQXm6Gr0gQ1ggG

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
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: attempts; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: choices; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: mamode
--



--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.answers_id_seq', 1, false);


--
-- Name: attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.attempts_id_seq', 1, false);


--
-- Name: choices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.choices_id_seq', 1, false);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, false);


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.exams_id_seq', 1, false);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.questions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mamode
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict AhBt9oRcqT0EpFWAs31jjPENY0N6BsckDkk7KxLWc6ZgrI0mpMQXm6Gr0gQ1ggG

