import StudentCard from './StudentCard'

const students = [
  { id: 1, name: "Ravi Kumar", age: 20, email: "ravi@test.com", city: "Kuppam" },
  { id: 2, name: "Priya Sharma", age: 22, email: "priya@test.com", city: "Chennai" },
  { id: 3, name: "Arjun Nair", age: 19, email: "arjun@test.com", city: "Bangalore" },
  { id: 4, name: "Deepa Rao", age: 21, email: "deepa@test.com", city: "Hyderabad" },
];

export default function StudentList() {
  return (
    <section className="sma-section">
      <div className="sma-section-header">
        <h2 className="sma-section-title">All Students</h2>
        <span className="sma-student-count">{students.length} students</span>
      </div>
      <div className="sma-student-grid">
        {students.map(s => (
          <StudentCard
            key={s.id}
            name={s.name}
            age={s.age}
            email={s.email}
            city={s.city}
          />
        ))}
      </div>
    </section>
  );
}