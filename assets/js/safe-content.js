/* Gizele Nunes - Metodo SAFE - article content model */
/* Mock editorial copy for the four pillar routes. No em-dash characters anywhere. */
(function () {
  'use strict';

  window.SAFE_CONTENT = {
    seguranca: {
      slug: 'seguranca',
      letter: 'S',
      pilarNum: '01',
      navTitle: 'Segurança',
      eyebrow: 'Pilar 1',
      title: 'Segurança: o contrato validado que sustenta cada decisão.',
      readingMin: 6,
      lead: 'Antes de aplicar qualquer advertência, suspensão ou demissão, existe uma pergunta que decide o resultado de um processo: o seu contrato foi escrito para proteger o consultório? No primeiro pilar do Método S.A.F.E., a resposta deixa de depender da sorte e passa a depender de estrutura.',
      body: [
        {
          type: 'section',
          heading: 'O alicerce que vem antes de tudo',
          paragraphs: [
            'Segurança não é o último cuidado que o dentista toma. É o primeiro. Tudo o que vem depois, a aplicação de uma penalidade, a formalização de uma rotina, a estratégia de implantação, se apoia sobre um único documento: o contrato. Quando ele é genérico, baixado de um modelo qualquer da internet, cada decisão de gestão fica exposta. Quando ele é validado por quem entende do setor, cada decisão ganha respaldo.',
            'No Método S.A.F.E., esse contrato é revisado por advogados especialistas em Direito Médico, da Saúde e do Trabalho. Não é uma minuta padrão adaptada às pressas. É um instrumento pensado para a realidade de quem dirige um consultório odontológico, com cláusulas que antecipam os conflitos mais comuns da relação entre o dentista e a equipe.'
          ]
        },
        {
          type: 'section',
          heading: 'Por que a formalização decide o jogo',
          paragraphs: [
            'A maioria das condenações trabalhistas não nasce de uma atitude errada do empregador. Nasce da ausência de prova. Sem contrato específico, sem advertência por escrito, sem histórico documentado, o consultório chega à audiência em desvantagem mesmo quando está com a razão. O juiz decide pelo que está nos autos, e não pela intenção de quem agiu.',
            'É por isso que o primeiro pilar trata a segurança como base, e não como detalhe. Com o contrato certo em mãos, o dentista para de torcer para que nada dê errado e passa a conduzir a relação de trabalho com previsibilidade. A punição deixa de ser um risco e passa a ser um direito exercido dentro da lei.'
          ]
        },
        {
          type: 'pullquote',
          text: 'Sem contrato validado, nenhum dos outros pilares se sustenta.',
          cite: 'Método S.A.F.E.'
        },
        {
          type: 'section',
          heading: 'Um escudo, não um manual genérico',
          paragraphs: [
            'Pense no contrato validado como um escudo jurídico. Ele não impede que conflitos aconteçam, porque conflitos sempre vão existir em qualquer equipe. O que ele faz é garantir que, quando o conflito chegar, o consultório esteja protegido. É a diferença entre instalar um sistema de compliance na clínica e seguir improvisando a cada novo problema.',
            'Esse é o ponto de partida de todo o método. Os outros três pilares, Aplicação, Formalização e Estratégia, só funcionam porque existe um contrato sólido por baixo deles. Comece pela segurança e o resto passa a fazer sentido.'
          ]
        },
        {
          type: 'stat',
          num: 80,
          suffix: '%',
          label: 'das ações trabalhistas no Brasil envolvem falhas na formalização da relação de trabalho.',
          source: 'TST, 2023'
        },
        {
          type: 'cta',
          text: 'Comece pelo alicerce. Garanta o contrato que sustenta cada decisão do consultório.',
          label: 'Quero blindar meu consultório',
          href: '#'
        }
      ],
      prevNext: { prev: null, next: 'aplicacao' }
    },

    aplicacao: {
      slug: 'aplicacao',
      letter: 'A',
      pilarNum: '02',
      navTitle: 'Aplicação',
      eyebrow: 'Pilar 2',
      title: 'Aplicação: como punir com respaldo e sem improviso.',
      readingMin: 5,
      lead: 'Ter um bom contrato é necessário, mas não basta. O que protege o consultório na prática é saber usar esse contrato no momento certo, com o documento certo e na ordem certa. O segundo pilar transforma a teoria jurídica em ação do dia a dia.',
      body: [
        {
          type: 'section',
          heading: 'Da teoria ao documento assinado',
          paragraphs: [
            'Muito dentista sabe, na intuição, que algo precisa ser feito quando um colaborador atrasa de novo, desrespeita um colega ou descumpre uma rotina. O que falta não é vontade, é método. O pilar da Aplicação entrega aulas práticas que mostram, passo a passo, como aplicar advertências, suspensões e demissões dentro da legalidade.',
            'Cada tipo de penalidade tem a sua forma correta. Uma advertência verbal não substitui a advertência por escrito. Uma suspensão precisa de fundamento e de registro. Uma demissão por justa causa exige um histórico que a sustente. Aprender essas diferenças é o que separa a punição que protege da punição que vira processo.'
          ]
        },
        {
          type: 'section',
          heading: 'A ordem certa importa mais que a intenção',
          paragraphs: [
            'No Direito do Trabalho, a sequência das medidas tem peso. Pular etapas, aplicar uma penalidade desproporcional ou registrar fora do prazo pode anular toda a ação, mesmo que o motivo seja justo. O segundo pilar ensina a respeitar essa gradação, para que cada documento construído fortaleça o próximo.',
            'Quando o dentista segue o protocolo, ele cria uma trilha de provas. Essa trilha é o que dá segurança para exigir resultados, corrigir condutas e, se for o caso, encerrar um vínculo sem medo. A formalização correta de hoje é a tranquilidade da audiência de amanhã.'
          ]
        },
        {
          type: 'pullquote',
          text: 'Punir sem respaldo jurídico é como tratar sem diagnóstico.',
          cite: 'Método S.A.F.E.'
        },
        {
          type: 'section',
          heading: 'O fim do improviso na hora da pressão',
          paragraphs: [
            'Punir sem respaldo jurídico é como tratar um paciente sem diagnóstico. O risco aumenta e o resultado fica comprometido. O improviso costuma aparecer justamente nos momentos de tensão, quando a decisão precisa ser rápida e a emoção fala mais alto que a técnica.',
            'Com as aulas de Aplicação, o dentista deixa de decidir no susto. Ele já sabe qual documento usar, como redigir e como arquivar. A penalidade passa a ser aplicada com calma e confiança, porque o caminho foi aprendido antes de a situação acontecer.'
          ]
        },
        {
          type: 'stat',
          num: 48,
          suffix: 'h',
          label: 'é o tempo suficiente para aplicar uma punição formalizada e segura quando o protocolo já está aprendido.',
          source: 'Protocolo S.A.F.E.'
        },
        {
          type: 'cta',
          text: 'Saia do improviso. Aplique cada penalidade com o documento e a ordem corretos.',
          label: 'Quero aplicar com segurança',
          href: '#'
        }
      ],
      prevNext: { prev: 'seguranca', next: 'formalizacao' }
    },

    formalizacao: {
      slug: 'formalizacao',
      letter: 'F',
      pilarNum: '03',
      navTitle: 'Formalização',
      eyebrow: 'Pilar 3',
      title: 'Formalização: conformidade que protege além do vínculo.',
      readingMin: 6,
      lead: 'A proteção do consultório não termina na relação com a equipe. Ela alcança os dados dos pacientes, as rotinas internas e a conformidade com a LGPD. O terceiro pilar amplia o escudo jurídico para frentes que muitos dentistas ainda ignoram.',
      body: [
        {
          type: 'section',
          heading: 'Quando o contrato encontra a LGPD',
          paragraphs: [
            'Formalizar é mais do que assinar papéis. É organizar o consultório para que ele esteja em conformidade com a legislação que já está em vigor. A Lei Geral de Proteção de Dados não é uma preocupação só de grandes empresas. Ela vale para qualquer negócio que colete e guarde informações pessoais, e o consultório odontológico faz isso todos os dias.',
            'Prontuários, fichas de anamnese, exames, contatos e dados de pagamento são informações sensíveis. O pilar da Formalização mostra como tratar esses dados dentro das regras, com rotinas claras de coleta, armazenamento e descarte, reduzindo o risco de autuações e indenizações.'
          ]
        },
        {
          type: 'section',
          heading: 'Dados sensíveis exigem rotina, não sorte',
          paragraphs: [
            'A maioria dos consultórios ainda lida com dados de pacientes no improviso, confiando que nada vai acontecer. O problema é que a conformidade não se resolve no dia em que o problema chega. Ela precisa estar montada antes. Um vazamento, uma reclamação ou uma fiscalização encontram o consultório do jeito que ele está, e não do jeito que ele pretendia estar.',
            'Com a Formalização, o dentista cria uma rotina simples e repetível para proteger informações. Não é preciso virar especialista em tecnologia nem contratar uma consultoria cara. É preciso seguir um protocolo pensado para a rotina clínica, que cabe no dia a dia de quem atende pacientes o tempo inteiro.'
          ]
        },
        {
          type: 'pullquote',
          text: 'Conformidade não é burocracia. É o que mantém o consultório de pé quando alguém pergunta.',
          cite: 'Método S.A.F.E.'
        },
        {
          type: 'section',
          heading: 'Aulas bônus com quem vive o tema',
          paragraphs: [
            'O terceiro pilar inclui aulas bônus com professores convidados, profissionais que conhecem de perto os desafios da gestão e da conformidade na saúde. Eles trazem exemplos reais e respostas práticas, no lugar de teoria distante da realidade do consultório.',
            'Essa camada extra de conteúdo é o que torna a Formalização completa. Ela conecta o contrato da equipe, a proteção de dados e a organização interna em um único sistema de conformidade, para que nenhuma frente fique descoberta.'
          ]
        },
        {
          type: 'stat',
          num: 60,
          prefix: 'R$ ',
          suffix: ' mi',
          label: 'em multas já foram aplicadas pela LGPD no Brasil desde a sua entrada em vigor.',
          source: 'ANPD, 2023'
        },
        {
          type: 'cta',
          text: 'Proteja a equipe e os pacientes na mesma estrutura. Coloque o consultório em conformidade.',
          label: 'Quero estar em conformidade',
          href: '#'
        }
      ],
      prevNext: { prev: 'aplicacao', next: 'estrategia' }
    },

    estrategia: {
      slug: 'estrategia',
      letter: 'E',
      pilarNum: '04',
      navTitle: 'Estratégia',
      eyebrow: 'Pilar 4',
      title: 'Estratégia: implantação guiada e suporte que continua.',
      readingMin: 5,
      lead: 'Um método só muda a realidade quando sai do papel. O quarto pilar existe para garantir isso. Em vez de entregar um material e desejar boa sorte, ele acompanha o dentista na implantação e mantém um canal de suporte para as dúvidas que aparecem depois.',
      body: [
        {
          type: 'section',
          heading: 'Do modelo pronto à sua realidade clínica',
          paragraphs: [
            'Nenhum consultório é igual ao outro. O número de colaboradores, a rotina de atendimento e os conflitos mais frequentes mudam de lugar para lugar. Por isso a Estratégia não entrega um contrato genérico para você se virar sozinho. Ela adapta o método à sua realidade, para que o protocolo funcione de verdade na sua clínica.',
            'Essa adaptação é o que evita o erro mais comum dos produtos digitais: o dentista assiste a tudo, entende a teoria e mesmo assim trava na hora de aplicar. Com a implantação guiada, a distância entre saber e fazer praticamente desaparece.'
          ]
        },
        {
          type: 'section',
          heading: 'Duas reuniões que mudam a execução',
          paragraphs: [
            'O pilar inclui duas reuniões de implantação com um especialista. Nelas, o contrato é ajustado ao seu cenário, as dúvidas iniciais são resolvidas e o passo a passo de aplicação é alinhado com a sua equipe. São encontros objetivos, voltados para tirar o método da teoria e colocá-lo em prática.',
            'Ter alguém ao lado nesse começo faz diferença. A insegurança costuma aparecer no primeiro caso real, e é exatamente aí que o acompanhamento entra. O dentista não precisa adivinhar se está fazendo certo, porque tem com quem confirmar.'
          ]
        },
        {
          type: 'pullquote',
          text: 'Ter o método é uma coisa. Ter autonomia com segurança é o que o quarto pilar entrega.',
          cite: 'Método S.A.F.E.'
        },
        {
          type: 'section',
          heading: 'Suporte que responde quando a dúvida aparece',
          paragraphs: [
            'Depois das reuniões, o suporte não acaba. O quarto pilar mantém um canal de suporte jurídico contínuo para as situações que surgem no dia a dia. Uma advertência específica, uma cláusula que gerou dúvida, um caso fora do comum: tudo isso pode ser conversado com segurança.',
            'Ter o método é uma coisa. Ter autonomia com segurança é outra. A Estratégia entrega as duas, porque coloca o dentista no controle e, ao mesmo tempo, garante apoio sempre que ele precisar. É como ter um advogado à disposição, com a liberdade de agir por conta própria.'
          ]
        },
        {
          type: 'stat',
          num: 2,
          suffix: ' reuniões',
          label: 'de implantação com um especialista para adaptar o contrato e o protocolo ao seu consultório.',
          source: 'Programa S.A.F.E.'
        },
        {
          type: 'cta',
          text: 'Tire o método do papel com acompanhamento de verdade. Implemente com suporte ao lado.',
          label: 'Quero implantar com suporte',
          href: '#'
        }
      ],
      prevNext: { prev: 'formalizacao', next: null }
    }
  };
})();
