## SQL
- Structured Query Language
- It is used to query, manipulate & transforme data from relational database.
- MySQL, sqlite, postgres, Oracle
- collection of data in rows and columns

### Select
- It is used to query database
- Ex: select name from users

### Operators
- =, !=, >, <, <=, >= Ex: col_name != 4
- BETWEEN AND Ex: col_name BETWEEN 1 AND 2
- NOT BETWEEN AND Ex: col_name NOT BETWEEN 1 AND 2
- IN () Ex: col_name IN (2, 3, 4)
- NOT IN () Ex: col_name NOT IN (2, 3, 4)
- LIKE Ex: col_name LIKE 'ABC'
- NOT LIKE Ex: col_name NOT LIKE 'ABC'
- % with LIKE Ex: cole_name LIKE '%A%'
- _ with LIKE Ex: col_name LIKE 'A_C'

### Filterig & sorting
- DISTINCT: It removes duplicate rows
- ORDER By: It orders the data alphanumerically on the column basis
- LIMIT: use to limit the no. of rows in output
- OFFSET: use to skip the no. of rows in output

### JOINS
- A join clause is used to combine rows from two or more columns.
- Inner Join: return rows from both tables where condition meet.
- Left outer join: Returns all records from the left table, and the matched records from the right table
- Right outer join: Returns all records from the right table, and the matched records from the left table
- Full outer join: Returns all records when there is a match in either left or right table

### Aggregate functions
- SQL also supports the use of aggregate expressions (or functions) that allow you to summarize information about a group of rows of data. In addition to aggregating across all the rows, you can instead apply the aggregate functions to individual groups of data within that group. One thing that you might have noticed is that if the GROUP BY clause is executed after the WHERE clause (which filters the rows which are to be grouped), then how exactly do we filter the grouped rows?
Luckily, SQL allows us to do this by adding an additional HAVING clause which is used specifically with the GROUP BY clause to allow us to filter grouped rows from the result set.
- count(column)
- min(column)
- max(column)
- avg(column)
- sum(column)
- having

### Order of execution
- From, Join: These clause runs first so that a working dataset is created in a temporary table under the hood.
- Where: The filtering of data happens on the dataset.
- Group by: This goups the filtered data. It is used with aggregated function.
- Having: If query has group by clause the filtering of data will be done using this clause.
- Select: Any expressions in the SELECT part of the query are finally computed.
- Distinct: On the remaining rows, duplicate rows marked with distinct will be removed.
- Order by: 
- Limit/Skip: 


# Database Normalization - Short Notes

## What is Normalization?
Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.

## Objectives
- Eliminate redundant data.
- Ensure data dependencies make sense.
- Improve efficiency of queries and storage.

---

## Normal Forms

### 1. First Normal Form (1NF)
- **Rule**: Each column should contain atomic (indivisible) values.
- **No repeating groups or arrays** in a table.
- **Example**:
  ❌ `Hobbies: "Reading, Music"`
  ✅ Separate into multiple rows or a related table.

---

### 2. Second Normal Form (2NF)
- **Rule**: Must be in 1NF **and** no partial dependency on part of a composite primary key.
- All non-key columns must depend on the whole primary key.

---

### 3. Third Normal Form (3NF)
- **Rule**: Must be in 2NF **and** no transitive dependencies.
- Non-key attributes should depend **only** on the primary key, not on other non-key attributes.

---

### 4. Boyce-Codd Normal Form (BCNF)
- **Rule**: Stronger version of 3NF.
- Every determinant must be a candidate key.

---

## Benefits
- Reduces data duplication.
- Improves consistency.
- Simplifies maintenance.

## Drawbacks
- May require more complex queries (due to more tables).
- Can reduce performance for read-heavy systems.

---
