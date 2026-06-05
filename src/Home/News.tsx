import React, { useState, useMemo } from 'react';
import { 
  FaSearch, FaFilter, FaCalendarAlt, FaNewspaper, 
   FaExclamationTriangle, FaStar, FaCalendarCheck,
  FaPhotoVideo, FaExternalLinkAlt, 
} from 'react-icons/fa';
import Navbar from '../Component/Navbar';

// ==================== TYPES ====================
type NewsCategory = 'investigations' | 'cybercrime' | 'terrorism' | 'public-safety' | 'community' | 'press-release';
type NewsType = 'featured' | 'press-release' | 'recent' | 'alert' | 'success' | 'event';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  date: string;
  category: NewsCategory;
  type: NewsType;
  link?: string;
}

interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  date: string;
}

// ==================== SAMPLE DATA ====================
const newsData: NewsItem[] = [
  {
    id: 'f1',
    title: 'FBI Director Announces New Joint Cybercrime Task Force',
    summary: 'In a major speech today, the FBI Director unveiled a new initiative combining federal, state, and international partners to combat ransomware.',
    imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFhUVFxYYGBcXGBgXFxcaGBcXGBkaFhcZHSggGBolGxcYITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi4lICUvLS0tLS0tNS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS4tLS0tLS0tLS0tLS0tL//AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAHAgMEBQYAAQj/xABIEAABAwIDBAYGBwQJBAMBAAABAgMRACEEEjEFBkFREyJhcYGRBzJSobHRFCNCU5LB8BYzYuEVQ1RjcoKisvEkJXPCRJOzNP/EABoBAAEFAQAAAAAAAAAAAAAAAAMAAQIEBQb/xAA1EQACAQIEAwYFAgYDAAAAAAAAAQIDEQQSITEUQVEFEyJSkaEVYXGBwTLRI5Kx4fDxM0Ji/9oADAMBAAIRAxEAPwDCNYtwpnpF6n7R4foVbMYpZSYWrQAdY6x8wPOqhlMzPL3xPwM1ZodHRGNQJHYR/MDyoEm1Zo1FFNWYvC41c+uv8RqY9ilp62dWntGq5pcgGI1t3E1LKgRBrsafjipJbo5qayya6EDZuIKnUqzrgA/aOpol7DdMDrE250HNjZg+Uezmkd2latO3cQCEMIA0F0k68SdAPOuVrNubublBpQuF7DLNr++mNrYNLg63uNZPZ7OJxGFWOlKX0q4WEGLcxzHbSdibAxaHCVPEgH7RUSoclA2FDuHsYzaiXXcaltjpCSuAlJOgPEAwIAM91EfYey1NkhtQdfBhbqySyx2IH9Y4PdxI0MFjZSkbRUUqyIeRlcKQc0klRCVD1CcplWt7XuKvfPfbopweDhCW4BWiQQQbpTcg9p7T31q08RKVJU19zLqwcZGj27vSxgElIWX8QrUlUqJn7akn6sXskJA5Chptje/F4gyt5QFxlQcgg8FZfW8aonXipRUolSiZJJkk8yTqa8FSjBIGSfpbn3i/xH516MU594v8R+dMJqz2FsdeJdDaBb7SuCE8SamMR0Ypz7xf4jWhw+7G0VpzBt3uK8p8iZrV7C3DZZcLinUv5boSBAB5qB17q2C3ktsreUbIQpRnhlBOp7qhKaSuiN7uwDtuNYnCwH+kQVTHXmY10PdVYcTiSSPrhxAJVOpiQDbhwq9wDxxeIdxL3WJMgHRIk5Up5BIj4mda1uysCgCBxuTxJPMms3EYp3sjRoYXNG7YM0PYwmB0pI5FQ99Oqxzk5Vl1Cu0qv2fGi9/Ryeyq7aeEbKVNLQClQN46w5EHgRqO0UOliWpahKmEWXRgy+mufeL/ABH50lWMc+8X+I/OuxuHKFqSToYn8/z8aimtVNNXM61nYkfTHPvF/iPzrvprv3i/xH51GFKpNCNJsLfTE4c+upxPsrUT5K1FEfYu32sZ12XS0+AAUm6T/jbkBY1uL8iKCVOYXErbUFoUUqTcEaio2EFnbuwi6VFkqZxABUWM5yOAGCpk/l3SBMkeY191JKStwEGCCVAg8jRB3T3mRjmww8cj6fVUmyrfbbPAjiPyNNb27COICjCRim05iE6Pt6BQHtcxwNrgg1oYXF28E/UiDn6W594v8Rq6w2JcLTYC1kmftHnWf4mt3ubs/M22qAVKKggHQAHrKI43tV6vXjQpubX0+pKEXJ2Htn7EWpIU68tGbQSZ77/KrLFbkFbUJxbgVrrWmwzIb/eozA/aF/drS1gIIWg5m1+IB7OVc1PtHEN3zexb7qK5Al2xsHF4W6nFrR7QUr3ibVBVtBaWyrpFSbDrHxNFTaywBlV1m12IOoJoQ734UsvdH9kCU9orZ7Ox6qXjU3W3zK1SFtUVz+0XIgOrv/Er51GGNd+9c/Gr50yoya9irU3ndwI4vGO/eufjV868VjnfvXPxq+dINMrN6G0kI0hRxHDOfIwKn7LwgM5jIkGDpdCVfOoAdsVAGOv5FIJ98e+puy3iDJtPRT4yg1xs00rG/Fpj+DZACkqHqqIqa3hUnhVdgXSpxc9k94kVZ54IjxrrOz5uVCP0OexkVGtJFGrCdFiC7qFG/ZpW92C80uIAB1P/ABWJdxkqdQogICQqTwJJH5Cp+w8VoUmDBH699YnaFCVKs83PX1NbCTjKmrGswWPxKXXgyylQNwpSog3F4GkRpWqaxCsgzRni8cDyrEbLQ4vqpVN9DYfG/jNXLCC1KjmAAuMxUknsBmO6qd0WmNbwOlOGxLgJCktmCOBNqDdEDfrHKOHKkKISpYQocFWzD3poc560MKrQM7FO8rD4pxIpGEYW4oIbSVKOiQJJon7tbhobIcfIdXaED92n/ET6x7KtXsVGzP7q7lu4oBwno2p1+2oc0g2jhNE7AbKaba6BgZEx1ljjp9r7R7asUkBJSuMoiwtxsIHhUTaeISplQSIylr/9E/Kh3bZCWxI2TgWWxkaQALyYuSLGZuTfWqjfcxs3FRyUPArAPutVvshPWV/5H/8Aemqzex1v6C+h1WUOlbSTBUAtWYoJgWAImeEUOb3bJQjdpJAh3XSoqMeqL9/6/KtYztTJOXo5/jk6cYGgrPbuIWytbTqcpgGQZB5EEa2rTYPYaHMyxH1gIIsTHITYCsmbTmbdKLVOyJe7+3+mJSpAzagiyTzvVJtXb7inSULLSAooGkqVpCUnXTjV+lpnDutpzJEQCSQNRAA5wPKoWJwrbrrqQ4kgKmEquDxJjTn41FOzJtNqx5uCht1x9Sktq6rbiVqQDHrJVE+r6qTUnencFWIcU+w4gFQByEZUmBqFJtfuqTue0hGIW2myejBNr5gsREaDrH3Vr+gB0Vx7tPkeFa2HleCMbERy1GBs7h4wZsyEJifWWLxfqxrWYivolbSuMH+f5dlUO092sK/PSMJCifWR1Fa6yNaPe4FS6gQVSSaJ23NwEKbAwoSlaTfOpRKhGkmw4cKwu1dgYjD/AL1lSR7Qun8QtTE07lfh31IUFpJSpJkEagijDu5tj6dhgsdV9gzaLqCSB/kVMEfKgwavdydrnDYttRPUUci+UE28jHvph2Xe+eyh0iMQ0nKl8wpP3boMLSY4zPiDWx3YShEpKkgoCGxeLJSCYHaoqNdtvDp6VTRjK6kPoAH22ikOK/zSk/5TzqmxGwn3m28pQIUrPKJk5rGQQdPyqGMxDnCMHyuWcLHdm+RiU8FVGcdjO3wWMw5Zhr5iPKqZ/BlGGQ0PXUSJkiBPfWcRs3GNOHqpUJlK8y1EHUesdOFqzLl2STVi4xONJOVXG3iPmPhWW9ILGdpLnFBA8D+h5VfYpYcR0gEHRQ9laeH64EVG3hZC8G6f4J8r0fCTcasX8yrVjowWAV7SZpQrq0Z4ib15kpzDt5lAe0oDzt+dFljFstJDYwrRCbTAv7tazcdjuGS8Oa9+dg9Gg6t7PYxOeeqeIie0ggT51zSjA59GrzSQsfnTAMpNKwYJKCT9spP+cKFUO1MPkfeLn/Us4CrmWR8ic0v61RjqqAV53/OpbzgCZqrwZWCBH2SPAKj9d1OYlwIFzGv6FbHZNuGi5cr/ANShj1/HdvkQfWcdHNmfwqBp7DMKyBxB/wAQHxqtVjsqytI+yU37QPlRA9HOz0YnBhK/WClwoWIlRMdovoaB2vVp10lB3aC4Vum/EU2z9pvaBYFWLLz7pCS4Ym8cu2rjH7oKQQcmYT6yfzTqPfWw3b3dbQlLhhXEAEEd5IsT8KwFF3saDqJK9zHb67uK/o4KEp6NaVZeaTKZV2yoHwNDrd7dt7FOlCRCUwVr1CQbT2ybUc/SE5GBxB/hA8SpIHxoJ4TFKTdKyntBI94rRoRSjYo1JObuFjd/d9rCoCGxf7SrZ1HtVwHYLVomUW5dg+dCHZ2+OJbiHM6eSxmB8dffWq2b6QmzAdaUnmpBCh5GD8aK4vkAys1O0EjMm5CcqpA41FxipaMJjrNa8ZdT+vGvW9ptP5S062ZBgSM34Te03qZ0SSmCcyZTppIUCnTvHlTbEGibgEQVf+Rz3kVA2nhOlw7yRcpWpY708O+JHjVgysEkDsVPC5IPwpjZqvq3Cb9dfjBoUo5otMnGeWSaA7vFDS0OpUVBWe/DgYEaAdar/Y+0E5UqB7wai7+IadwzDzKcgWtwlsn2ITIAJAAM6c6wzG1CkRmIg24HXjWbOi4uzNaGJUvEtmarFY84hZltSwLBKUyY1uVRJmTAvTX0hWHIUltaQdQpI08CSi/A++mdnbTQpKUZ8qbyqcqgdbEEamlbRKECUurWk3OcqJI7CTxpsvIfvFa/Mvd1sQF4wXPqJJgTfpW4B5aGtu0s50wv+tfBBm9lHKJ5H4VivRVhypt7EFWVRdbEq9gEGL+0Tlnmk1vlsqzC6LLc7wFJskfxaT2VpUFlgkZeIlnm2M4PFLhEwZSxJBGqs2Y24WFcdpkHrIItOn+P8kf6hXqMIoZeoiwZ0MeoTmjsE2plTCo9RQtwVP3nzHmOVF0AaktrEIJjif8An8qi49sLQUW6MiCmPWB/KlJkKTZXikHgrjSlwU935E017EtwCbWaSh5xCJypWQJ1gc6iTT+1nJecJ9tXxqMFUgoc0H6Rh8I8DyJ7czZQRPACfM1NaJQvKDEioe7Scuz8KDxQ2Yjne/IX8TSdt4bOUcrg/kfOqOI/UW8K7DeMYxBdQVOtltJtlBBibSZ1i0VL2vtApHVgE1Qnd8i/1SQNFIUUqPkai47aaW7KWDHbJqpJmlZdTtlNr+kOoN0uoKj2EQAffHlUnFJnDKRx6Jc+AIp/d/EpUy7iSIzQhE65Um58VH3Coq1ZlOJHEK94n86JT0aKdazbsCRSaU2qnlC5B4GklIrsVDmmZNyz3a2Yt/ENobE5VJWonRKUqBJPlFaHbW0S0+42RJSqJFxzp/0ftuNsYjEZwhtIJBgEqKRef4fzJqdgsiUJ6VvM4oZ1mJ6y+ufLNHhXMdoYnPipJq8Y6JLe+79NjSwsHGGjtcxqViBTYfyBU6GCmPaBB+fnTaQdeFV20HyVxwT+jW5jowdG0vsZ2GnKE7xLV/aplRQIBJIJuRJnuqsdeKjKjJ7aShdc4m1ZabUFBbIsSeaWZ7jS1GLx4UUvRFJZWR9lwz3FKSD5g0MHEUT/AELlJQ+hQMShXLWRf8Iphh/f9ONcUHE//wA6SlIQLXJAzrJgXJA7B41N3GffStam1gtpPWYsZzdbMIMIVM9957HfSXirNMJNl5lLFgClIkATxFiO2DwpjcTGhGKCJkOIUlPWSYSlSiMwA1tr29ooLSuatKMp4OV9lsW3pUxg/o/qn944gQbG0qgj/LQ03f3VexoWW4hBA6xgEkExPCw42uK3PpmxH1OHRzcUr8KY/wDahdhcc60rM04tB5pUU+ca0ZXy6GUrcyRjMOplxTKxCkGCJBg94tTSXqYLpUVLUSSokknUk8T214w0VrSgGCogTy7fCiqTSETMLtMtONui5QoK74OnjRt2ftNHQtuKyNpWlKhKrQQmImJt8KFqMLhmVQEZiIuoBR04TYcdBTr2OnTuqLnci43NrsrelnDMhsysjMYAAuVqNyTpBGk1Wftk9Cg2hCEqKlSesrrGbTaPCsqgjMM0x7p4A0+86P5RUHJsZQSNJu4z9OOIS+Seo2lJt1OssgpAt6wntmsjvJustlzKtOtwRoocx+pFX2zt4DgsG6+lAK1uobRNwDlWqVRrABtxJFVw9Iz7zSm3GWXgSFSUGUpB60JCgJ5EEXtcmgVI5teYenK2nIyP0FSTaR3Vc7v7vuY1wIlWRMZ1fZSIsI0KuQ8TarFjarbiZ+jiALjOrUCTNgoRcTMWrVbh71ggsrYbS0kwh1pJCZkyFgzmuPXBM9sE0OMXfULUioq6Gd5mPoX0foeojKpBAvOVSVpzczmKlX4zTLO+a0qCloQ4M4WTBSrNly5pFvVtpVx6SmczTZF+vqORSTr4UOw2oW9/wqynbYq2TCA9vIhTY6BJbcASBcKEZ5UBPYTc1f4TENrjLfnC/wCMm49/dQnwrkaG/H9fr3Vas4rnrzjl21NSIuHMIxVp1VjT7XYjX9cDUTFugBPVUTlvBAPjzNYXGNh5N3XgfaS4tJ8QDB8RWE2wytp1SelcUOCipUkdt6VxshL3y2eGcSoAkhYz3EEFRMjwqnw7KnFJbQJUohIHMkwKl4bZq3AFKWEp4FRJPgK1+5Wym230n1lwrKSBAIHAc+2mdRJFiOHqNXtoElrDp+qbKiS2BCU6SE5QVnjSMe31T3qHupnBthtUgkk9Y3uSdJPIXPjVhjP3JV2/yrOq1HLUPCGUFWPRiFR0biwCSOzu7KkYPYpSmVSom5J4dlX722cOwMj0gOAkGCRMnlcGq5zeLCJSsB9JJBiMxM+VqFlZci01cm4l3LhUpTYQm3jS9iN5jJ1IHwil4JhOIw+ZM5eE2nwqXhCGskj1QAe48fMe+nu7leQKN58CpnEuJi0yO43qHhU5lJTMZlATykxRc343eQ+2HgOskajWPzoZ4LZBL7aM6UgqT1jaADM342roqGOh3Wrs0ii6Em7pXNPicEhppnDtulYddCDIKTlnOqRxEWqed4cY0S2NnZwFKIUZulSipJt2EU1trChvGthJJCGHnB/iNhEVrytZgqBQqEyj6QkZTAtHCsrCVcyU3rdX16tv6dEWK+isv8t/sDDTwylX2QL+AqmWonredWOP2kXGUTwSlAjSE6k9piqxCoFX8XWc1FPpcp042uPsLqQKgNKAVbSpSFVViwgubVvvQ4/Dzzc+shJ/Coj/AN6wCjfvrUejLFZMcke2lSPOD+VTGN36S09dokWly4yzOVIT63CR+rVVbvYgpxTRzCekGfrpIUVEgZQBwC7xVx6Rp6ViPWhyPVi5TM5uys7sh4B1kycvSIySpEjrt5swA4yY/kaBJ+I6HCRvhLfJ/kV6XsbnxLTY0bbJ8Vqv/sFZLYmyHcW70LIGcgnrGAANSTB5++rT0j4oL2g7BsgIR5IBPvJrPYPHONEqacWgkQShRSY1iR3VZvoc8bhfo1fQjM5iMO2ALypUDxIFZFtOTEENqS4ltX7wSEEaZkzE6251XYzFrWZWtSzzUoq+JqXs1tOSVEyTZPYOJ7ZnyqDkxGoCArrXMgaW8xGtOhocjb9chULBvCEj4+J4VOF+XvHxpkIQACBYX8eE02oc/L+VSGiIH5R3a8dKjvmOERHxpCNXsDYTWK2c+29OQKKhljMFJQCCCQe0R2mrbdPcbCsNdKnMpb6AVZohKVgKKEgD1dNZJgV7upbZuJPJL3uaFarAJAw7UjRtH+0VB7jAX3u2O3hcS4ygkNHoVqEEhtCioOKRa+RIBjQTxg0W9ibIabaS2AnIAAAIiIjhrbjQg27ixi38U8kSFHKiRqGkwIBTYJIlSeJJ7CCf6NMUpeAaCzKmwW5vcIMJIkC2WItpFMHqReVMRvxgEowhKQYStBAN4BJTbxVQ6PcNO7j4UWN8282CeHIJP4VpP5UKAb8bfkKmtgI8vZq20hamnEBR9ZSSAZmACRyHPhUYEfqf1/xWh2zvIp9ltlSEJCMpJvJKU5RF+qIJrJhRCwCNQOHZSTfMRIW7Byg6kcBxP/NZTbGK6SVRcECeQhU5u2csHvq6xOIhR5BBMzyFvfHnVdsLZScS8hpSi2lZMq1slJVF+PV40r6j2IxfhIRwhI91OYTaK2zIJtpcgjuINRcZCgY527r0hq4HcKBe7Zq8kgi7D3ww+VPSuEOakKBudAAeNXu1d6GRhipTib6AGTrAEd1CFbYPCo+JSMqjxt8aA4a3ISpms3wxAWGJ0U2SeySCCO0fAmqDDYNSVhKgc6oyjmDoruPDzqCp9a4zqJgQJ4DlV7sbb6UPh59CnSlKUpg3SEgJEZjyHmTzqdhkmohd2Ng0sMIanRMntJ199UG1MakOpHCejPbMCR2ggnwNUmP9I6DHRsrzG3WygA8NCbVmXtvvk5pAvIEafnehqLvdg4wbC5st4N4dXTKASBqeUX8PnQe2xjgp1SkeqTI7tB+u2k7R25iXxDjpKfZACR7hVVjlwcvh5CKnHQJFOCbZdYPaR6QICozjoydSlKrdXlGvfRLVu2+4c5cw6yftOYUFZiwzEqEmBrFBfCEhSTyINFvaGCw6nCpZxZUrKSUvKSkykGwCgAI7Kt0Of7FXEttpgYYWcscAT74+VOo5im8MLU6lMd1RTb3ADKj1qkIXUd/WlIVTJ6iJhNWO7eK6LFMuHRLiCe7MAfdNVSFUqaJcQZvSO7mdZEHKEHMYTxWkdXN2iKzjDxSQomCkJUrrIAKU9EQBbW3u76nbY2gMQ1gnRclm3qkZs6ErCs3Ig1Q7ReCWFaxED1Ac5SnxKbfo0GT8R0uDtHBpvo/yZzauL6R51yZzuLVPYpRI90VHBpkXPdXLcirFzmjxyr3BwW02AgDxtr41nmuuoJmNZMT7uNaBsqMdGiBwBN/GoNiJbCoUB39o4VaNL4zb+VZ5xyHEcDpVuws2199JMRYMeqewn4z38aaxfH/gUtk3IPYefAg/lXmJ0HC38tNakMbvd1f/AGrFH+B73sg/nV3vPiS1s11Q1DBSO9SMojtkis3u85/2rGDklwebKan+kh/Ls5YnXoxznrJsLG5iAYsYNtRFodboFexm4SoZTeREQSUhPV9UdZH2jbMb8ZJT9GCvqXR/fKIOgUClN0iBCZBt2cNALdkt6jKq/Vga2y/VjqWWniYv49Yl+jBVnx2oVOgVmziUiBA6sR2eAiW6y/hmr3jROEfH90v/AGk0HlXUqD5+HKjXtZILDo5tr/2mgeDfxHbTxKY/iEGD5Tr2eGtVGPeSVmDdJE/nU7FudXSZPC/b+VZ5QcSpSlJgG3An9Xp2JDmOcJWqI9Tv+0mq9rFupX1FQRqeVKdfJKoF4SBzuedLwuExH2YHM2t4njUNyRGxB9bgQdOHGvWl3jkkfz95qVtbCkQtbqVrjrQQSOUx5VGZHVCuJIHhF/iPKhvSRo05ZlccJqHtA2jmRUpdQ8UdO+mZOb0PAaUDSJr2aYZMUNR31KUahoVcVJb1pEoscy9Ychfyuar3zJk8bju4VYuLAQqdVdUfE/CPGq/EOA5OwR7/AOdMRqWJOyoL7QPqlxE92YUTMNhwpIJwmHUR1CVOrSolHUkgJgerQpaWcwI4XHeKIP8ARn0kB8LKekAJAURBgBVu8GovEKhLNLZr3BSpOrGy3BszSyumROsxTqXxxNWUUBt4WrxBp9pIWrLwg/CmE1JxaSkIeSaWoHXUUyKcQ6RrpTJjmh3bxRMtKukXAIBgFSc2XNYTA76e3meAQhN5soWSBlAIExeZ+FUODfyLSsaAg8/CDTm08YHHCrgI7J/RmoZfFc044tLBOnzvb7DKbC/GmVqmvTJua9baKiEpBJOgFFuZZZ7uIglzLmPqidBpc9vwq7ebcVoQAfZGvjxpTOB6JsIC0QLqggkq4kx+oA8Y+Ix4SMqLk8f+aWwiuxqAhaBMnMNe21XDDogWHD86y20l3B7j5GtBhnLA8jxqMXqIuEudYa3kfn+VOvCRHaf176qlPGxA8Od576ti7InuNqIMaTd52Nn45KjEIBMzbMkjv4VaelIf9uWbat6iftptEG50B4Eg2iazOynIwmNT7TbA83FD4GtT6V30/wBHuAEDrN6gkeunsN+APAwba0zFHdAu2Ym3qnXLEXsR9X6n7wcVcbjjBIfov9bEdoZMgQD+90EDTQ9s0Odlo4ZTrlyx1vWH1c5P3v8AF/wSH6M5zvwNUs34GM9hYXGhN7343ii9V/4jf7SV9S7/AONf+00DgbnnRm26opwz5/unP9hoLhXWNOkUEe5zN+A4nj8Txqu2i4lRj+XKpTztirmTr2W+NVuKXaY4UmySKtJBcVfLexAJ8IFSUIbJALi1dgEeECoGHchSjE30q7wOJVlISwU/xApn/VrUEOMNJbMtpauqxM6f8VWNqiByVH68qumHW2wcp617qjWqvaDSQrMlQUFQbcxr56+dRmtLh6E7Ow027I7RUfFG014TlM9te4gSk0Mst3TGQ5XZ6bbTNKKKRBN2HWFSrwNS0GoeGHW8KcxjkAJHGmJxlaN2IcelU8ADHlSAbjsFIJ+FLQmfhSB3ux0P8AKsGtpvoASkmBpHbc+81EZZAEmp7EFIMCiQmo7q49SLa3sUTZnWnCio7S71JbTJAGpIA8ammURplJSsEdvwNLDKvZPkaJGydmtMgBCwFRdWij48B2Vbtn+/V+JXzqtLF2WVL3LCw9+YIxh1+yryNLGGX7KvI0Y2ifv1fiV86ltp/vz5n50PjP8Az7k1hvmBRGEUL5FdoAN/dVptXDIUoKZaKU36oQoACbC8kmNTRibQPvveakttj773mo8c1/19yawi83sAZWCX7Cvwn5VP2Jg1gklFtCSkkxySOM+WlHEYdPF0e+ljCo+9HvpcfLye4/CR83sB97Y7cT0Z5+wfBSbeBEdoqGMKhN+gfUeR0/FNx3TRuGFR98PfXHCt/fD30zx0vJ7oXCR83sfPG0GHnF/uVJBsEpSqE+JHvq6wuHXlHUX+E/KjacK19+n30r6M19+PI0yxs/L7i4WHm9gNfR1x6ivwmrHCIVkjIqRI0MdnCisMM19+PwmvfozX34/Calx1Tyr1Q3Cw8z9Af7DnI8FIMFLP2T9l5JNa/wBLcqwWRIzFTiRATn0lXqgH2YngSDarA4Vr78fhNIGDY+/H4TSeNn5V/MhLCwTvmfoBvZ+DWlWXoXI9WMpsM37ucl1cc/bHZRF9FqSl18qBTKGbkZQcuYQAQOsM1zeTftOiGEZ/tA/CqkqwjH9oH4TTLGVPKvULKlFxy3foTd7Xh9EeAgkoUAAZmRGg76DbjS+sQ25x+yT+VFZOEYH/AMgfhNLDDP8AaP8ASafjZ+VeoHhYdX6AaxDD2UJDThjkhX5CoOIwTxH7l3T2FfKjp0LH9o/0mkFlj7//AEmmeMn5V6j8LDq/Q+fmtmYptV8M5CrjqKNu3KDB7DV1hsA+uymV5eWVwJ/9Z/nRnDDH3/8ApNK6Ngf1/wDpNLjJ8or+YXDQ6v0BC1sQDTDqCufRmfAgfnUPbWz3Y6jDqpsfq3Mwt2W+Io0lLH33+k02pLH3x/CfnTPGz8q9SUcNBO936ACXsXEn/wCO9/8AWv5V4nYeKgj6M/2fVr+VHlaWPvj+E/Omilj70+X86HxcvKvUN3cfn6AGVsfENpKl4d5CRqpTa0pHeSIFRTX0AW2fvD5UJt/9lNYfEjoYyOJzQBASZIIA4CwPiaNRxGd2at9xnDKjMMEZiTpF6jFRVKjqTSljWui1WAD10Ek38qW2DAptesU+3TkY7i1qyi5uailXaa9cMmmQTVnDu1wGId2eBNOtKIIIOhmkxUnZqW+ma6YkNdIjpCJkIzDPEXnLNBWwMJ25uHw+KSHcTj8PhkaZFOth4ka9VSuoORIvyi9bJex9i5YTtVoHmcThz5iBPhFUY3g3U/sw/wDpd+dQN2tl7K2lthbbDRODGFKggFxqHErbBNlBWizxigdxHoG759SLtrFIw7mROJYfQbpWy4lY7lBJORXYfAm9RE7xI9oVont1Nk4jDPYvDNPNDBYjI+hbiylxDak9KJzkiWySCCDIq92l6I8KUYvomyFKQPov1rpyLDfGV9YFcetMXoMsImw0cVbkYZG8qPaFPI3pRpm+NbBHo+2T9OOFyKzN4ZDnR9O6OmUtSwTJXmGUNiyYH1t5gQOPSXsZvDYhCGsK9hAUElK3S6lZzEZm151SIiQYI4iorA30TJrGpci7/apHtfGuG9SPa+NDbKfaV517kV7SvOn+GPqPxy6BJ/apHP41w3qb5j30NcivbV512Q+2rzp/hj6i45dAlftU37Q9/wAqSrexHBQ99DbIfaV516hhSiACsk6AGSaXwx82Ljl0CSd8G+K68G+bRMBcnkASfICqzYXo/HVcxiyAr1W0klau4Jkm1/yrXtHD4ZKktsNNhCS4oEF50CYzdG1MCRxUNDYVl1KtGMstNOb+W3r+1wvfS3ehVt7zTP1b1tYbVbvtao2I3tQn1g4n/ElSfiO0edaRW3BCicQAU5ZhDd84lP8AWKHWi0kSRyqJs7bqMUhRGRxMxDrKm5MSQFpKwTFzAsOVNmqqLk6Lsujf7WG79XtcpBvk0RZVe/tgj9TT+1t1MFiAFJH0ZSrJWkpU0s8IUCU3nQnNY2rAbc3eewq8jmYCbKE5Vf4SaPhu5xDyxdpdH+OT+wpYiUVdq6+RuRvajn8a9/a1HP40NQ0faV513RH2ledX/hr6guOXQJf7Wp/U15+1if1NDXoz7SvM13RH2leZpvhr6i45dAk/tUjn8aR+1KZ9Y/rwoddGfaV5mvOjPtK8zS+GvqPxy6BHO9Sefx+VeHetHb+vChz0R9pXma7ov4leZpfDH1Fx66BEO9KeZ8q8VvUn9A0PehPtK8zXvQfxK8zT/DX1Fxy6G/VvWgXJt3GsvvfiS6/K1lBSlICYChHragwbnUWqlSqDBuL63r0NAxSpYdU3clOcqisRgq5kyAaVmnsrxSQLDma9iYAqwAV0eMiTNOrTTgaimXacnbKtRoiuSg160LzTtaWDopwzMo1pa2IoqXszGll5p5IlTTiHAOBKFBUHsMR41Dr0Gs9MR9B7N9JOMxDYdY2At1tUwtDwUDBg/wBTqCKp2dp7UTtRW0k7EeGbDhjos1h1kqzZw3/DEZeOtDLdfe/GYBRVhnikKMqQRmbX/iSePaIPbWvf9OG01JICMKgn7SW3Mw7RmcKfMGmESt+N7MUnDKwZ2anZ6MQVKWJlbtwVkdVOpgFRBkWrxfpcxBODPQJ/6W6x0h/6g9EWpPV+r9ZSo61yOVx/tPa7uJdU884pbitSoyewDgEjgBApgGjRSaGNv+3ra8XiMVidnNYjpi0UoWuCx0Sco6Nzoyb6mAKg79b5ObScbWppLSGkqShAUVkZiCoqWQM3qp4DSstShRFFbiFClCkA17RBhVdXgriacY8ombpbBThWw6sJOIcTmGaSGUERmMcesLC5JAGpjM+j/ZqXHy84PqsOM5nSR6s+N62G0MUXFrabfyPiSpIupKsnUBQnrrCEqAGTReZRBFq5/tOvKtV4aDst5P8AH06/VFulFQjne/I9xmIW50mV1KW1NqSXAqXkuZkwVjTogFZihBKYMmZmlYfZLzpQ+SWnEtFKlBRSlJV6y0k5hlzoQpPVSmBEmrLdDdtJl9YSCvKpWQFKFqTJDgbVZKjJIEDUqi4CYnpTS+G0JSgDCgpUpQ9bpJIGefs3HjxoMIKPhp6La9t+v+/YeMc8vEIG5qcQHf8AqG1qeDIX0XRiOhEJKUpcUE9v5Ux+xLjAZKQXDh1rW2VQkArySVhOYKgpBElvSCeWEbWZkWI0Oh92mlafY+/OLZICl9KgESly6o4wvUHvnuo6q1FHLmdvt0t0XLQNLCLdEXau1cS26cOwyoJbQJS4lKgtptKhJBABbUkpUbnraEcdDhejeaDTyBkUE52yZcwylwQM0Zst0iDdEiZBBF0zj8LtFJDSiy+AYByhYJ4t6hXPt4jQjHBpzDuhAMBGbMggpQtYaK3XcS4QpTwUnMYSDZQT1TQ69KFeCjGKjKKvdX1tzv8A5brbcEXKk9djJby7DXhHi2q6TdCoIzJ8eI0NVYNFLeTZoxGFW0B9YwOka0KigSCgniUlKkHUygHjQqSa0OzMY8RStP8AVHR/h/cFXp5XdbMXXVwrq0gJ1dXCupCPRXsUma9mkOcK50mDHnyr0U0pRmeFDqytENRhmZFHClJXpXPIg02k1TLOzOJqQy3xptpHE6U6tdOPFc2eOrqKs04tVR3FUiFSRJaECumkoNq6tuk7QSKElqR66urqxQh7Xs15XUhDiFU8lddXVJMQsKpQNdXURMYWDXtdXUVMRxNeE11dTkQmbjsJbwKVH+udKj/gZClEHvDah/mFKwuysz6EKZR0qlFS3uhWM/WUF5VKPUdsVBVwRBETFdXVycK0o1ar5ty9rovVFpFBNYxOTqFpQABiIMxyAOnzFY30pbT+qaQhS0ZlKzJ6ycwAHrA63iurq0ovJDKiNJXqJgySk6CSSeFzPZ20T9x908jXSvBxt1SlDLmIGQWAWgylQkE3B1rq6oxjpcs4mbVoovXdz8Eoz9HSDMykrRB/hykR4VQekXABKErzPhCkltQaCVuLtYFSwSLBcqBB6950rq6nS8UX81+xTk21qQ938TmS0ejW2JKFJWnLZxKjB+rQknM2kkpTEuKvqaF228L0WIeb0yOKA7pt7orq6h4B5cfUjHa35/uSqa0UyIk0qurq6FFQ8r2urqQjq9FdXUhDWIXAjnSG1cK6uqpVd5F2hojSbH3SdxCMyiG08MwlSh2DgO0+VQdv7sqwpSVLzBUxYg25nSurqEiy4plWo8KaXXV1OwbGSKbA415XUkAe4/wpE11dWrTbyIqz/Uz/2Q==',
    date: '2025-06-04',
    category: 'cybercrime',
    type: 'featured',
  },
  {
    id: 'pr1',
    title: 'Justice Department Announces Arrest of 14 in International Fraud Ring',
    summary: 'Operation "Fake Fortune" dismantled a network stealing millions from elderly victims.',
    imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=400&h=250&fit=crop',
    date: '2025-06-02',
    category: 'investigations',
    type: 'press-release',
  },
  {
    id: 'pr2',
    title: 'FBI Releases 2024 Internet Crime Report',
    summary: 'Annual report shows record number of complaints, with losses exceeding $12.5 billion.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    date: '2025-05-28',
    category: 'press-release',
    type: 'press-release',
  },
  {
    id: 'r1',
    title: 'Former Intelligence Analyst Sentenced for Espionage',
    summary: 'A 25-year prison term was handed down for selling classified documents.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop',
    date: '2025-06-03',
    category: 'terrorism',
    type: 'recent',
  },
  {
    id: 'r2',
    title: 'New PSA: Elder Fraud Schemes Targeting Rural Communities',
    summary: 'FBI warns of scammers impersonating utility companies.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
    date: '2025-05-30',
    category: 'public-safety',
    type: 'recent',
  },
  {
    id: 'a1',
    title: 'WANTED: Jason Derek Brown – Terrorism Charges',
    summary: '$200,000 reward for information leading to arrest. Considered armed and dangerous.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    date: '2025-06-01',
    category: 'public-safety',
    type: 'alert',
  },
  {
    id: 'a2',
    title: 'Scam Alert: Fake FBI Agents Demanding Payment',
    summary: 'Callers spoofing FBI phone numbers – never send money or personal info.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
    date: '2025-05-25',
    category: 'public-safety',
    type: 'alert',
  },
  {
    id: 's1',
    title: 'Operation Cross Country Rescues 87 Children',
    summary: 'Joint operation with DHS recovers victims and arrests 120 traffickers.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    date: '2025-05-20',
    category: 'investigations',
    type: 'success',
  },
  {
    id: 's2',
    title: '$5 Million in Assets Returned to Fraud Victims',
    summary: 'FBI’s Financial Crimes Task Force seizes crypto assets, returns to elderly victims.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop',
    date: '2025-05-15',
    category: 'community',
    type: 'success',
  },
  {
    id: 'e1',
    title: 'FBI Virtual Career Expo – June 25',
    summary: 'Learn about careers as special agents, analysts, and professional staff.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    date: '2025-06-25',
    category: 'community',
    type: 'event',
  },
  {
    id: 'e2',
    title: 'Press Conference: Cyber Threat Update',
    summary: 'Live stream from FBI Headquarters, Washington D.C.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
    date: '2025-06-10',
    category: 'press-release',
    type: 'event',
  },
];

const mediaGallery: MediaItem[] = [
  { id: 'm1', title: 'FBI Laboratory Tour', type: 'photo', url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=450&fit=crop', date: '2025-05-10' },
  { id: 'm2', title: 'Director Wray Testifies Before Congress', type: 'video', url: 'https://www.youtube.com/embed/YxgsRci2fmQ', thumbnail: 'https://img.youtube.com/vi/YxgsRci2fmQ/0.jpg', date: '2025-05-05' },
  { id: 'm3', title: 'Citizens Academy Graduation', type: 'photo', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop', date: '2025-04-28' },
];

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
};

// Helper to get unique years from news items
const getUniqueYears = (items: NewsItem[]): string[] => {
  const years = items.map(item => new Date(item.date).getFullYear().toString());
  return Array.from(new Set(years)).sort().reverse();
};

const categoryLabels: Record<NewsCategory, string> = {
  investigations: 'Investigations',
  cybercrime: 'Cybercrime',
  terrorism: 'Terrorism',
  'public-safety': 'Public Safety',
  community: 'Community Programs',
  'press-release': 'Press Releases',
};

const News: React.FC = () => {
  // State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [archiveYear, setArchiveYear] = useState<string>('all');
  const [archiveMonth, setArchiveMonth] = useState<string>('all');

  // Derived data
  const featured = newsData.find(item => item.type === 'featured');
  const pressReleases = newsData.filter(item => item.type === 'press-release');
  const safetyAlerts = newsData.filter(item => item.type === 'alert');
  const successStories = newsData.filter(item => item.type === 'success');
  const events = newsData.filter(item => item.type === 'event');
  const years = getUniqueYears(newsData);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Filtered news for main feed
  const filteredNews = useMemo(() => {
    let filtered = newsData.filter(item => item.type !== 'featured');
    
    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.summary.toLowerCase().includes(term)
      );
    }
    
    // Archive filters
    if (archiveYear !== 'all') {
      filtered = filtered.filter(item => new Date(item.date).getFullYear().toString() === archiveYear);
      if (archiveMonth !== 'all') {
        filtered = filtered.filter(item => new Date(item.date).getMonth().toString() === archiveMonth);
      }
    }
    
    // Sort by date descending (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeCategory, searchTerm, archiveYear, archiveMonth]);

  // Reset archive month when year changes to 'all'
  const handleYearChange = (year: string) => {
    setArchiveYear(year);
    if (year === 'all') {
      setArchiveMonth('all');
    }
  };

  return (
    <div className="bg-white min-h-screen">
        <Navbar/>
      {/* Hero Section with Search */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 mb-4">
            <FaNewspaper /> News & Media
          </h1>
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* 1. Featured News */}
        {featured && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
              <div className="md:w-1/2">
                <img src={featured.imageUrl} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <span className="text-xs bg-[#B22234] text-white px-2 py-1 rounded-full w-fit mb-2">FEATURED</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B60] mb-3">{featured.title}</h2>
                <p className="text-gray-600 mb-4">{featured.summary}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#B22234] font-semibold hover:underline">
                  Read More <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. Press Releases */}
        {pressReleases.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6">Press Releases</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pressReleases.map(pr => (
                <div key={pr.id} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col sm:flex-row">
                  <img src={pr.imageUrl} alt={pr.title} className="sm:w-32 h-32 object-cover" />
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-[#0B3B60]">{pr.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(pr.date)}</p>
                    <p className="text-sm text-gray-600 mt-2">{pr.summary}</p>
                    <a href="#" className="inline-block mt-2 text-[#B22234] text-sm font-semibold hover:underline">Full release →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Most Recent News with Filters & Archive */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3">Most Recent News</h2>
            <div className="flex flex-wrap gap-2">
              <FaFilter className="text-gray-500 self-center" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-[#B22234]"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Archive Dropdowns */}
          <div className="flex flex-wrap gap-4 mb-6 bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <select 
                value={archiveYear} 
                onChange={(e) => handleYearChange(e.target.value)} 
                className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#B22234]"
              >
                <option value="all">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            {archiveYear !== 'all' && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <select 
                  value={archiveMonth} 
                  onChange={(e) => setArchiveMonth(e.target.value)} 
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#B22234]"
                >
                  <option value="all">All Months</option>
                  {months.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No news articles match your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                  <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-[#0B3B60] text-lg">{article.title}</h3>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full shrink-0">{formatDate(article.date)}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 flex-grow">{article.summary}</p>
                    <a href="#" className="mt-4 text-[#B22234] text-sm font-semibold inline-flex items-center gap-1 hover:underline">Read more →</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Public Safety Alerts */}
        {safetyAlerts.length > 0 && (
          <div className="mb-12 bg-red-50 rounded-xl p-6 border-l-4 border-[#B22234]">
            <h2 className="text-2xl font-bold text-[#B22234] flex items-center gap-2 mb-4">
              <FaExclamationTriangle /> Public Safety Alerts
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {safetyAlerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-lg p-4 shadow">
                  <h3 className="font-bold text-[#0B3B60]">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alert.summary}</p>
                  <div className="mt-2 text-xs text-gray-400">{formatDate(alert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Success Stories */}
        {successStories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2 mb-4">
              <FaStar className="text-[#FFD700]" /> Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {successStories.map(story => (
                <div key={story.id} className="bg-gray-50 rounded-xl p-5 flex gap-4 items-start">
                  <img src={story.imageUrl} alt={story.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-[#0B3B60]">{story.title}</h3>
                    <p className="text-sm text-gray-600">{story.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Events & Conferences */}
        {events.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2 mb-4">
              <FaCalendarCheck /> Events & Conferences
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {events.map(ev => (
                <div key={ev.id} className="border rounded-lg p-4 flex items-start gap-3 hover:shadow transition">
                  <div className="bg-[#0B3B60] text-white rounded-lg p-2 text-center w-16">
                    <div className="text-lg font-bold">{new Date(ev.date).getDate()}</div>
                    <div className="text-xs">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B3B60]">{ev.title}</h3>
                    <p className="text-sm text-gray-500">{ev.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. News Categories (visual badges) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0B3B60] mb-4">News Categories</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === value
                    ? 'bg-[#B22234] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-[#B22234] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* 8. Media Gallery */}
        <div>
          <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2 mb-4">
            <FaPhotoVideo /> Media Gallery
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaGallery.map(media => (
              <div key={media.id} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                {media.type === 'photo' ? (
                  <img src={media.url} alt={media.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="relative pt-[56.25%]">
                    <iframe 
                      src={media.url} 
                      title={media.title} 
                      className="absolute top-0 left-0 w-full h-full" 
                      frameBorder="0" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="p-3">
                  <p className="font-medium text-[#0B3B60]">{media.title}</p>
                  <p className="text-xs text-gray-400">{formatDate(media.date)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-2 text-[#B22234] font-semibold hover:underline">
              View full gallery →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;