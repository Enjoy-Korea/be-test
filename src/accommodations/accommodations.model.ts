import pool from "../db/db.index";

export class AccommodationModel {
  // TODO: 반환형 타입 설정하기
  async getAccommodationById(id: number): Promise<any> {
    const [rows] = await pool.query(
      `
        SELECT A.id
             , A.title AS name
             , A.description AS description
             , A.address AS address
             , AAT.name AS houseType
             , A.price AS pricePerDay
             , AU.url AS imageURL
             , AU.url_key AS URLKey
        FROM accommodation A
           , accommodation_type AAT
           , accommodation_url AU
        WHERE A.accommodation_type_id = AAT.id
        AND   AU.accommodation_id = A.id
        AND   A.id = ?
        ORDER BY URLKey;
      `,
      [id]
    );

    return rows;
  }

  async getUniversityNameByAccommodationId(id: number): Promise<any> {
    const [rows] = await pool.query(
      `
        SELECT U.name
        FROM university U
          , accommodation_university AU
        WHERE U.id = AU.university_id
        AND AU.accommodation_id = ?
        ORDER BY name;
      `,
      [id]
    );

    return rows;
  }
}

const accommodationModel = new AccommodationModel();

export { accommodationModel };
