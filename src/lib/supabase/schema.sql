-- Öğrenci tablosu
create table students (
  id bigint primary key,
  ad_soyad text not null,
  kademe int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Dersler tablosu
create table courses (
  id bigint primary key,
  course_name text not null,
  kademe int not null
);

-- Üniteler tablosu
create table units (
  id bigint primary key,
  units_name text not null,
  course_id bigint references courses(id)
);

-- Konular tablosu
create table topics (
  id bigint primary key,
  topic_name text not null,
  unit_id bigint references units(id)
);

-- Kazanımlar tablosu
create table achievements (
  id bigint primary key,
  achievement_name text not null,
  topic_id bigint references topics(id),
  course_id bigint references courses(id),
  unit_id bigint references units(id)
);

-- Eksik kazanımlar tablosu
create table missing_achievements (
  id bigint primary key,
  student_id bigint references students(id),
  achievement_id bigint references achievements(id),
  deneme_id bigint,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Denemeler tablosu
create table tests (
  id bigint primary key,
  test_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Öğrenci test sonuçları
create table student_test_results (
  id bigint primary key,
  student_id bigint references students(id),
  test_id bigint references tests(id),
  course_id bigint references courses(id),
  net decimal(5,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Hedef okullar
create table target_schools (
  id bigint primary key,
  student_id bigint references students(id),
  school_name text not null,
  target_score decimal(5,2) not null
);

-- Öğrenci puanları
create table student_scores (
  id bigint primary key,
  student_id bigint references students(id),
  test_id bigint references tests(id),
  score_type text not null,
  score decimal(5,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Günlük hedefler
create table daily_goals (
  id bigint primary key,
  student_id bigint references students(id),
  solved_questions int not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ödevler
create table assignments (
  id bigint primary key,
  title text not null,
  description text,
  due_date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Öğrenci ödevleri
create table student_assignments (
  id bigint primary key,
  student_id bigint references students(id),
  assignment_id bigint references assignments(id),
  status text not null default 'pending',
  submission_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);