DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.tutors CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
DROP TABLE IF EXISTS public.topics CASCADE;
DROP TABLE IF EXISTS public.student_modules CASCADE;
DROP TABLE IF EXISTS public.tutor_modules CASCADE;
DROP TABLE IF EXISTS public.exams CASCADE;
DROP TABLE IF EXISTS public.exam_results CASCADE;
DROP TABLE IF EXISTS public.questions CASCADE;

CREATE TABLE
    IF NOT EXISTS
        students (
            student_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR ( 50 ) NOT NULL,
            lastName VARCHAR ( 50 ) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TABLE
	IF NOT EXISTS
		tutors(
			tutor_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			lastName VARCHAR(50) NOT NULL,
			expertise VARCHAR(50) NOT NULL,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);





CREATE TABLE
	IF NOT EXISTS
		modules(
			module_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			starts_at DATE NOT NULL,
			ends_at DATE NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
		);

CREATE TABLE
    IF NOT EXISTS
        student_modules(
            relation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            student_id  INTEGER REFERENCES students,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

CREATE TABLE
    IF NOT EXISTS
        tutor_modules(
            relation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            tutor_id INTEGER REFERENCES tutors,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );



CREATE TABLE
    IF NOT EXISTS
        topics(
            topic_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(50) NOT NULL,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );


CREATE TABLE
    IF NOT EXISTS
        questions(
            question_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            question_text VARCHAR(50) NOT NULL,
            option_a VARCHAR(50) NOT NULL,
            option_b VARCHAR(50) NOT NULL,
            option_c VARCHAR(50) NOT NULL,
            option_d VARCHAR(50) NOT NULL,
            correct  VARCHAR(50) NOT NULL,
            topic_id INTEGER REFERENCES topics,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );


CREATE TABLE
    IF NOT EXISTS
        exams(
            exam_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(50) NOT NULL,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );


CREATE TABLE
    IF NOT EXISTS
        exam_results(
            result_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            student_id  INTEGER REFERENCES students,
            exam_id INTEGER REFERENCES exams,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );



